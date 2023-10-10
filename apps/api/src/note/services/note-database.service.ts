import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { Note, NoteUpdateArgs } from 'prisma';
import { CreateNoteDto, UpdateNoteDto } from '~note/dto/note.dto';
import { DatabaseService } from '~persistence/prisma/database.service';
import { NoteStatus } from '#interfaces/notes/notes.interface';
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
      return correctParentIdCase(
        await this.db.$queryRaw`
        WITH RECURSIVE noteTree(id, title, content, status, next, parentId, depth) AS (
            SELECT parent.id, parent.title, parent.content, parent.status, parent.next, parent."parentId", 0 as depth
            FROM "Note" parent
            WHERE parent."userId" = ${userId}
              AND parent."parentId" is null
              and parent."id" is not null
            UNION ALL
            SELECT child.id, child.title, child.content, child.status, child.next, child."parentId", noteTree."depth" + 1
            FROM "Note" child
                     INNER JOIN noteTree ON child."parentId" = noteTree."id"
            where  child."id" is not null
        )
        SELECT *
        FROM noteTree;`,
      );
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

  async create({ userId, title, content, parentId, next }: CreateNoteDto): Promise<Note> {
    if (!userId) {
      this.report('No user id provided for create note', HttpStatus.BAD_REQUEST);
    }
    if (!title) {
      this.report('No title provided for create note', HttpStatus.BAD_REQUEST);
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
        User: {
          id: userId,
        },
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
      return this.db.user.update(query);
    } catch (err: any) {
      this.report('Failed to update note', err);
    }
  }

  delete(id: string, userId: string): Promise<Note> {
    if (!id) {
      this.report('No note id provided for delete note', HttpStatus.BAD_REQUEST);
    }
    if (!userId) {
      this.report('No user id provided for delete note', HttpStatus.BAD_REQUEST);
    }

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
      this.report('Failed to delete note', err);
    }
  }


}

const correctParentIdCase = (notes: Note[]) => {
  for (let index = 0; index < notes.length; index++) {
    if (typeof notes[index].parentid !== 'undefined') {
      notes[index].parentId = notes[index].parentid;
      delete notes[index].parentid;
    }
  }
  return notes;
};
