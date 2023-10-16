import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { Note, NoteUpdateArgs } from 'prisma';
import { CreateNoteDto, UpdateNoteDto } from '~note/dto/note.dto';
import { DatabaseService } from '~persistence/prisma/database.service';
import { DetachedNote, NoteStatus } from '#interfaces/notes/notes.interface';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class NoteDatabaseService extends ComponentWithLogging {
  constructor(
    private readonly db: DatabaseService,
    private readonly logger: Logger,
  ) {
    super();

    this.setLogs({
      debug: (...args: any) => logger.debug(args),
      error: (...args: any) => logger.error(args),
      log: (...args: any) => logger.log(args),
      warn: (...args: any) => logger.warn(args),
      verbose: (...args: any) => logger.verbose(args),
    });
  }

  async list(userId: string): Promise<Note[]> {
    if (!userId) {
      this.report('No user id provided for list notes', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.db.note.findMany({
        where: {
          userId,
          status: NoteStatus.active,
        },
      });
    } catch (err: any) {
      this.report('Failed to list notes', err);
    }
  }

  get(id: string, userId: string): Promise<Note> {
    if (!id) {
      this.report('No note id provided for get note', HttpStatus.BAD_REQUEST);
    }
    if (!userId) {
      this.report('No user id provided for get note', HttpStatus.BAD_REQUEST);
    }

    try {
      return this.db.note.findUnique({ where: { id, userId } });
    } catch (err: any) {
      this.report('Failed to get note', err);
    }
  }

  async create({ userId, title, content, parentId = null, next = null }: CreateNoteDto): Promise<Note> {
    if (!userId) {
      this.report('No user id provided for create note', HttpStatus.BAD_REQUEST);
    }

    const query: Prisma.NoteCreateInput = {
      title,
      content,
      status: NoteStatus.active,
      User: {
        connect: {
          id: userId,
        },
      },
    };

    if (parentId) {
      query.Parent = {
        connect: {
          id: parentId,
        },
      };
    }

    if (next) {
      query.Next = {
        connect: {
          id: next,
        },
      };
    } else {
      let lastNode: Note;
      try {
        lastNode = await this.db.note.findFirst({
          select: { id: true },
          where: { parentId: parentId, next: null, userId, status: NoteStatus.active },
        });
      } catch (err: any) {
        this.report(`Failed to retrieve final root node for user: ${userId} (used for note creation) (1)`, err);
      }
      query.Prev = {
        connect: {
          id: lastNode.id,
        },
      };
    }

    try {
      return await this.db.note.create({ data: query });
    } catch (err: any) {
      this.report('Failed to create note', err);
    }
  }

  update({ id, userId, title, content, head, next, status }: UpdateNoteDto): Promise<Note> {
    if (!id) {
      this.report('No note id provided for update note', HttpStatus.BAD_REQUEST);
    }
    if (!userId) {
      this.report('No user id provided for update note', HttpStatus.BAD_REQUEST);
    }
    const query: NoteUpdateArgs = {
      where: {
        id,
        userId,
      },
      data: {},
    };

    if (!title && !content && !status && !head && !next) {
      this.report('Cannot Update Note: No fields to Update');
    }

    if (title) {
      query.data.title = title;
    }
    if (content) {
      query.data.content = content;
    }
    if (status) {
      query.data.status = status;
    }
    if (head) {
      query.data.head = head;
    }
    if (next) {
      query.data.next = next;
    }

    try {
      return this.db.note.update(query);
    } catch (err: any) {
      this.report('Failed to update note', err);
    }
  }

  async delete(id: string, userId: string): Promise<Note> {
    if (!id) {
      this.report('No note id provided for delete note', HttpStatus.BAD_REQUEST);
    }
    if (!userId) {
      this.report('No user id provided for delete note', HttpStatus.BAD_REQUEST);
    }

    const note = await this.get(id, userId);

    if (!note) {
      this.report('Note marked for deletion does not exist');
    }

    const { sibling, originalNext, originalParent } = await this.detachNote(note, userId);

    try {
      return this.db.note.update({
        where: {
          id,
          userId,
        },
        data: {
          status: NoteStatus.deleted,
        },
      });
    } catch (err: any) {
      if (sibling) {
        this.error('Move Operation Failed, reverting note\'s previous sibling\'s "next" property', err);
        await this.detachNote_Revert(id, sibling, originalNext, originalParent, userId);
      } else {
        this.error('Move Operation Failed', err);
      }
      this.report('Failed to delete note', err);
    }
  }

  /**
   * identifies if a node is the ancestor of another. Useful for avoiding things like infinite ancestor loops
   * @param userId - string: user which owns the note tree
   * @param descendant - string: id of descendant node
   * @param ancestor - string: id of potential ancestor
   */
  async isAncestor(userId: string, descendant: string, ancestor: string): Promise<boolean> {
    if (!userId) {
      this.report('No user id provided for list notes', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.db.$queryRaw`
          WITH RECURSIVE noteTree(id, parentId) AS (
              SELECT descendant."id",  descendant."parentId"
              FROM "Note" descendant
              WHERE descendant."userId" = ${userId}
                AND descendant."id" = ${descendant}
              UNION ALL
                SELECT ancestor."id", ancestor."parentId"
                FROM "Note" ancestor
                INNER JOIN noteTree ON ancestor."id" = noteTree."parentid"
                WHERE ancestor."userId" = ${userId}
          )
          SELECT COUNT(id)
          FROM noteTree result
          WHERE result."id" = ${ancestor};`;

      return Number(result[0].count) !== 0;
    } catch (err: any) {
      this.report('Failed to list notes', err);
    }
  }

  /**
   * Remove a note from its current position and return an object which can be used to reattach the note
   * @param note - Note: The note being detatched from the NoteTree.
   * @param userId - string: user which owns the note tree
   *
   * @return originalSibling - Note: the updated Sibling and the original 'next' property of the sibling
   *    so the detachment can be reverted.
   *
   *  Find Note [A]: where A.next === note
   *    If A: A.next = note.next
   */
  async detachNote(note: Note, userId: string): Promise<DetachedNote> {
    const originalParent = note.parentId;
    let sibling: Note | undefined;

    try {
      sibling = await this.db.note.findUnique({ where: { next: note.id, userId } });
    } catch (err: any) {
      this.report('Failed to detach note, could not search for sibling.', err);
    }

    if (!sibling?.id) {
      return {
        sibling: null,
        originalNext: null,
        originalParent,
      };
    }

    try {
      const newSiblingNextPointer: Prisma.NoteUpdateOneWithoutPrevNestedInput = note.next
        ? {
            connect: {
              id: note.next,
            },
          }
        : {
            disconnect: true,
          };

      sibling = await this.db.note.update({
        where: { id: sibling.id, userId },
        data: {
          Next: newSiblingNextPointer,
        },
      });
    } catch (err: any) {
      this.report('Failed to detach note from sibling.', err);
    }

    try {
      if (note.parentId) {
        sibling = await this.db.note.update({
          where: { id: note.id, userId },
          data: {
            Parent: {
              disconnect: {
                id: note.parentId,
              },
            },
          },
        });
      }
    } catch (err: any) {
      this.report('Failed to detach note from parent.', err);
    }
    return {
      sibling,
      originalNext: note.id,
      originalParent,
    };
  }

  /** Undo operation done by detachNote function in this service */
  async detachNote_Revert(
    noteId: string,
    sibling: Note | null,
    originalNext: string | null,
    originalParent: string | undefined,
    userId: string,
  ) {
    try {
      await this.db.note.update({ where: { userId, id: sibling.id }, data: { next: originalNext } });
    } catch (err: any) {
      this.error("Failed to revert target's previous sibling's \"next\" property. Consolidating User's Note Tree", err);
      await this.consolidateTree(userId);
    }
    try {
      const noteRecord = await this.db.note.findUnique({ where: { userId, id: noteId } });
      if (noteRecord && noteRecord.parentId !== originalParent) {
        this.db.note.update({ where: { userId, id: noteId }, data: { next: originalNext } });
      }
    } catch (err: any) {
      this.error("Failed to revert target's previous sibling's \"next\" property. Consolidating User's Note Tree", err);
      await this.consolidateTree(userId);
    }
  }

  /**
   * Use when a user's tree is suspected to have nodes that are not strongly linked.
   * Moved any loose notes out of their current position and into the last nodes in the user's root nodes
   * @param userId - ID of User whose tree is being investigated
   * @param attempt - Due to critical nature of this fallback function, it will attempt to run up to 3 times in case of
   *    error
   */
  async consolidateTree(userId: string, attempt: number = 0) {
    try {
      //TODO Create function to consolidate a user's note tree.
      // Function should move any out-of-tree nodes onto the root of the tree.
    } catch (err: any) {
      if (attempt < MAX_CONSOLIDATION_ATTEMPT) {
        this.error('FAILED TO CONSOLIDATE USER TREE', err);
        await this.consolidateTree(userId, attempt + 1);
      }
      this.report(
        '--CRITICAL FAILURE--\n' +
          '`CRITICAL FAILURE: UNABLE TO CONSOLIDATE USER TREE [User: ${userId}]`' +
          '\n--CRITICAL FAILURE--',
        err,
      );
    }
  }
}

const MAX_CONSOLIDATION_ATTEMPT = 3;
