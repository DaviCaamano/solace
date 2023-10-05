import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { NoteFindManyArgs, Note, NoteUpdateArgs } from 'prisma';
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

  list(userId: string, includeDeleted: boolean = false): Promise<Note[]> {
    if (!userId) {
      this.report('No user id provided for list notes', HttpStatus.BAD_REQUEST);
    }

    const query: NoteFindManyArgs = {
      where: {
        User: {
          id: userId,
        },
      },
    };
    if (!includeDeleted) {
      query.where.status = NoteStatus.active;
    }
    try {
      return this.db.note.findMany();
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
      return this.db.note.findUnique({
        where: {
          id,
          userId,
        },
      });
    } catch (err: any) {
      this.report('Failed to get note', err);
    }
  }

  async create({ userId, title, content, parentId, siblingId }: CreateNoteDto): Promise<Note> {
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

    let newNote, previousFirstChild;

    if (siblingId) {
      query.Sibling = {
        connect: {
          id: siblingId,
        },
      };
      /**
       * Parent specified, but sibling is not.
       * This child will be created as the first child (first displayed in ordered lists)
       */
    } else if (parentId) {
      try {
        previousFirstChild = await this.getFirstChild(parentId);
      } catch (err: any) {
        this.report('Failed to retrieve first child of parent');
      }
    }

    try {
      newNote = await this.db.note.create({ data: query });
    } catch (err: any) {
      this.report('Failed to create note', err);
    }

    try {
      if (previousFirstChild) {
        await this.db.note.update({
          where: { id: previousFirstChild.id },
          data: {
            siblingId: newNote.id,
          },
        });
      }
    } catch (err: any) {
      if (newNote) {
        this.report('Failed to update first child that was moved from first position. Deleting new Child entry');
        await this.db.note.delete({ where: { id: newNote.id } });
      } else {
        this.report('Failed to update first child that was moved from first position.');
      }
    }
  }

  update({ id, userId, title, content, status }: UpdateNoteDto): Promise<Note> {
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

    if (title) {
      query.data.title = title;
    }
    if (content) {
      query.data.content = content;
    }
    if (status) {
      query.data.status = status;
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

  getFirstChild = (parentId: string) => this.db.note.findFirst({ where: { parentId, siblingId: null } });
}
