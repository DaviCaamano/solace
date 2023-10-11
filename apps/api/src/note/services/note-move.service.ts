import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { DatabaseService } from '~persistence/prisma/database.service';
import { MoveNoteDto } from '~note/dto/note.dto';
import { NoteDatabaseService } from '~note/services/note-database.service';
import { Note } from 'prisma';
import { MoveNotePosition } from '#interfaces/notes';
import { Prisma } from '@prisma/client';

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
      verbose: (...args: any) => logger.verbose(args),
      warn: (...args: any) => logger.warn(args),
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
  async move({ id, position, targetId, userId }: MoveNoteDto): Promise<Note | undefined> {
    if (await this.dbService.isAncestor(userId, targetId, id)) {
      return this.report('Cannot move Note: ancestors cannot target their own descendants');
    }
    let note: Note | undefined = await this.dbService.get(id, userId);

    /** Redundant Operation, cancelling */
    if (this.redundantMoveCheck(note, targetId, position)) {
      return note;
    }

    if (!note) {
      this.report('Failed to find note being moved');
    }

    const { sibling, originalNext, originalParent } = await this.dbService.detachNote(note, userId);

    try {
      switch (position) {
        case MoveNotePosition.aheadOf: {
          return this.moveAheadOf(note, targetId, userId);
        }
        case MoveNotePosition.childOf: {
          return this.makeChildOf(note, targetId, userId);
        }
        case MoveNotePosition.lastNote: {
          return this.addToEndOfRoot(note, userId);
        }
      }
    } catch (err: any) {
      if (sibling) {
        this.error('Move Operation Failed, reverting note\'s previous sibling\'s "next" property', err);
        await this.dbService.detachNote_Revert(note.id, sibling, originalNext, originalParent, userId);
      } else {
        this.error('Move Operation Failed', err);
      }
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
      sibling = await this.db.note.findUnique({
        where: { userId, next: targetId },
      });
    } catch (err: any) {
      this.report("Failed to update next property of target's previous sibling.", err);
    }

    if (sibling) {
      try {
        sibling = await this.db.note.update({
          where: { userId, next: targetId },
          data: {
            Next: {
              connect: {
                id: note.id,
              },
            },
          },
        });
      } catch (err: any) {
        this.report("Failed to update next property of target's previous sibling.", err);
      }
    }

    /**
     * Update note's next and parent properties.
     *    note.next = target
     *    note.parent = target.parent
     */
    try {
      return await this.db.note.update({
        where: { id: note.id, userId },
        data: { next: target.id, parentId: target.parentId },
      });
    } catch (err: any) {
      await this.moveAheadOf_Revert(err, target.id, userId, sibling);
    }
  }

  /**
   * Revert changes to previous sibling of target (performed in moveAheadOf function in this service.
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
        await this.dbService.consolidateTree(userId);
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
  async makeChildOf(note: Note, targetId: string, userId: string) {
    const firstChild = await this.findFirstChild(targetId, userId);

    const updateData: Prisma.NoteUpdateInput = {
      Parent: {
        connect: {
          id: targetId,
        },
      },
    };
    if (firstChild?.id) {
      updateData.Next = {
        connect: {
          id: firstChild.id,
        },
      };
    } else {
      updateData.Next = {
        disconnect: true,
      };
    }

    return this.db.note.update({ where: { id: note.id, userId }, data: updateData });
  }

  /**
   * Given a parent, find the child in the highest position among the note's children
   *   set parentId to null to find last root node
   * @param parentId - string | null:
   *    if string: will retrieve the first child element of a specified parent note or null if parent has no children
   *    if null: will retrieve the first root element
   * @param userId - string: user which owns the note tree
   * @param attempt - Attempt again in case a tree must be consolidated.
   */
  async findFirstChild(parentId: string | null, userId: string, attempt: number = 0) {
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
    await this.dbService.consolidateTree(userId);
    return this.findFirstChild(children, userId, attempt + 1);
  }

  /**
   * Move note to the end of the user's root notes.
   * A root note has no parent notes.
   * @param note - Note: note being moved.
   * @param userId - string: user which owns the note tree
   */
  async addToEndOfRoot(note: Note, userId: string) {
    let roots: Note[];
    try {
      roots = await this.db.note.findMany({ where: { parentId: null, userId } });
    } catch (err: any) {
      this.report(`Failed to retrieve list of root nodes for user: ${userId} (1)`, err);
    }
    if (!roots) {
      this.report(`Failed to retrieve list of root nodes for user: ${userId} (2)`);
    }
    const lastRoot = roots.find(({ next }: Note) => !next);
    const updateData: Prisma.NoteUpdateInput = {
      Parent: null,
    };
    if (lastRoot) {
      updateData.Prev = {
        connect: {
          id: lastRoot.id,
        },
      };
    }
    try {
      return await this.db.note.update({
        where: { id: note.id, userId },
        data: updateData,
      });
    } catch (err: any) {
      this.report("Failed to move note to end of user's root notes", err);
    }
  }

  redundantMoveCheck(note: Note, targetId: string, position: MoveNotePosition) {
    const alreadyChildOfTarget = position === MoveNotePosition.childOf && note.parentId === targetId;
    const alreadyAheadOf = position === MoveNotePosition.aheadOf && note.next === targetId;
    const alreadyLastNote = position === MoveNotePosition.lastNote && !note.next && !note.parentId;

    return alreadyChildOfTarget || alreadyAheadOf || alreadyLastNote;
  }
}
