import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { NoteDatabaseService } from '~note/note-database.service';
import { CreateNoteDto, UpdateNoteDto } from '~note/dto/note.dto';
import { DeleteNoteResponse, ListNotesResponse, NoteResponse } from '#interfaces/notes';

@Injectable()
export class NoteService extends ComponentWithLogging {
  constructor(
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

  list = async (userId: string): Promise<ListNotesResponse> => ({
    notes: await this.dbService.list(userId),
  });

  get = async (id: string, userId: string): Promise<NoteResponse> => ({ note: await this.dbService.get(id, userId) });

  create = async (newNote: CreateNoteDto): Promise<NoteResponse> => ({ note: await this.dbService.create(newNote) });

  update = async (updatedNote: UpdateNoteDto): Promise<NoteResponse> => ({
    note: await this.dbService.update(updatedNote),
  });

  delete = async (id: string, userId: string): Promise<DeleteNoteResponse> => ({
    success: !!(await this.dbService.delete(id, userId)),
  });
}
