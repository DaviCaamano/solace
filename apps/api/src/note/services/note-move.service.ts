import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { DatabaseService } from '~persistence/prisma/database.service';
import { MoveNoteDto } from '~note/dto/note.dto';
import { NoteDatabaseService } from '~note/services/note-database.service';
import { Note } from 'prisma';
import { getTypeScriptInstance } from 'ts-loader/dist/instances';
import { MoveNotePosition } from '#interfaces/notes';
import { NoteUpdateInput } from '.prisma/client';
@Injectable()
export class NoteMoveService extends ComponentWithLogging {
  constructor(
    private readonly db: DatabaseService,
    private readonly dbService: NoteDatabaseService,
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

  /**
   * Core Function of this serivce. Moves note nodes to different locations in a user's note tree.
   * Notes are stored via heirachical link-list matrices
   * @param id - string: the id of the Note being moved
   * @param position - enum[MoveNotePosition] - Determines the operation being performed while moving the note.
   * @param targetId - The note node which the note is being moved to.
   *      Based on the operation this may or may not be required.
   *      required:
   *          moveAhead: the note with note.id = id will be moved in front of target as a sibling
   *          makeChildOf: the note with note.id = id will be made the first child of target
   *      not required: prependToRoot
   *          The Note will be moved to the last spot on highest depth (aka: root nodes) in the user's heiarchy
   * @param userId - string: user which owns the note tree
   */
  async move({ id, position, targetId, userId }: MoveNoteDto): Promise<any> {
    let note: Note | undefined;
    try {
      note = await this.dbService.get(id, userId);
    } catch (err: any) {
      this.report('Failed to find note being moved (1)', err);
    }
    if (!note) {
      this.report('Failed to find note being moved (2)');
    }
    const { sibling, originalNext } = await this.detachNote(note, userId);
    try {
      switch (position) {
        case MoveNotePosition.aheadOf: {
          return this.moveAheadOf(note, targetId, userId);
        }
        case MoveNotePosition.childOf: {
        }
        case MoveNotePosition.lastNote: {
        }
      }
    } catch (err: any) {
      if (sibling) {
        this.error('Move Operation Failed, reverting note\'s previous sibling\'s "next" property', err);
        await this.detachNote_Revert(sibling, originalNext, userId);
      } else {
        this.error('Move Operation Failed', err);
      }
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
  async detachNote(note: Note, userId: string) {
    let sibling: Note | undefined;
    try {
      sibling = await this.db.note.update({ where: { userId, next: note.id }, data: { next: note.next } });
    } catch (err: any) {
      this.report('Failed to detach note.', err);
    }
    return {
      sibling,
      originalNext: note.id,
    };
  }

  /** Undo operation done by detachNote function in this service */
  async detachNote_Revert(sibling: Note, originalNext: string, userId: string) {
    try {
      return this.db.note.update({ where: { userId, id: sibling.id }, data: { next: originalNext } });
    } catch (err: any) {
      this.error("Failed to revert target's previous sibling's \"next\" property. Consolidating User's Note Tree", err);
      await this.consolidateTree(userId);
    }
  }

  /**
   * the note "note" will be moved in front of target as a sibling
   * @param note - Note: note being moved
   * @param targetId - string: id of the note who is being shifted to the right so make room for "note"
   * @param userId - string: user which owns the note tree
   */
  async moveAheadOf(note: Note, targetId: string, userId: string) {
    let target: Note | undefined;
    try {
      target = await this.dbService.get(targetId, userId);
    } catch (err: any) {
      this.report('Failed to find note being moved to (move ahead operation) (1)', err);
    }
    if (!target) {
      this.report('Failed to find note being moved to (move ahead operation) (2)');
    }

    /** Update the 'next' property of the sibling which currently points at the target note
     *  Find Note [A]: where A.next === target
     *    If A: A.next = note
     * */
    let sibling: Note | undefined;
    try {
      sibling = await this.db.note.update({ where: { userId, next: targetId }, data: { next: note.next } });
    } catch (err: any) {
      this.report('Failed to detach note.', err);
    }

    /**
     * Update note's next and parent properties.
     *    note.next = target
     *    note.parent = target.parent
     */
    try {
      return await this.db.note.update({
        where: { userId, id: note.id },
        data: { next: target.id, parentId: target.parentId },
      });
    } catch (err: any) {
      await this.moveAheadOf_Revert(err, target.id, userId, sibling);
    }
  }

  /**
   * Revert changes to previous sibling of target
   *    sibling.next => back to target
   */
  async moveAheadOf_Revert(err: any, targetId: string, userId, sibling?: Note) {
    if (sibling) {
      this.error(
        "Failed to update note's parent and next properties, reverting target's previous sibling's \"next\" property",
        err,
      );
      try {
        await this.db.note.update({ where: { userId, next: sibling.id }, data: { next: targetId } });
      } catch (err: any) {
        this.error(
          "Failed to revert target's previous sibling's \"next\" property. Consolidating User's Note Tree",
          err,
        );
        await this.consolidateTree(userId);
      }
    } else {
      this.report("Failed to update note's parent and next properties", err);
    }
  }

  /**
   * Move Note to be the first child of a targeted note.
   *    Find first child [F] of targeted note [T]
   *        note.next = F
   *        note.parentId = T
   * @param note - Note: note being moved such that it becomes the first child in the targeted note's children
   * @param targetId - Note: Parent Note who is having a note inserted as its new first child
   * @param userId - string: user which owns the note tree
   */
  async makeChildOf(note: Note, targetId: string, userId) {
    const firstChild = this.findFirstChild(targetId, userId);
    const updateData: NoteUpdateInput = {
      parentId: targetId,
    };
    if (firstChild) {
      updateData.next = firstChild.id;
    }
    this.db.note.update({ where: { id: note.id, userId }, data: updateData });
  }

  async findFirstChild(parentId: string, userId: string, attempt: number = 0) {
    let parent: Note | undefined;
    try {
      parent = await this.db.note.findFirst({
        where: { id: parentId, userId },
        include: {
          Children: true,
        },
      });
    } catch (err: any) {
      this.report('Failed to find parent note to insert child into (1)', err);
    }
    if (!parent) {
      this.report('Failed to find parent note to insert child into (2)');
    }

    const children = parent.Children;
    if (!children?.length) {
      return null;
    }

    const nextIds: string[] = children.map(({ next }: Note) => next);
    for (let child of children) {
      if (!nextIds.includes(child.id)) {
        return child;
      }
    }
    /** Should not execute if child list is properly structured */
    this.error("Unable to find first child, list of children not strongly linked. Consolidating User's Note Tree");
    await this.consolidateTree(userId);
    return this.findFirstChild(parentId, userId, attempt + 1);
  }

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
