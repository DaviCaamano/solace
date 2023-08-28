import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { NoteDatabaseService } from '~note/note-database.service';
import { CreateNoteDto, UpdateNoteDto } from '~note/dto/note.dto';
import {
  DeleteNoteResponse,
  ListNotesResponse,
  NoteResponse,
} from '#interfaces/notes';

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

  async list(userId: string): Promise<ListNotesResponse> {
    const notes = await this.dbService.list(userId);
    return { notes };
  }

  async get(id: string, userId: string): Promise<NoteResponse> {
    const note = await this.dbService.get(id, userId);
    return { note };
  }

  async create(newNote: CreateNoteDto): Promise<NoteResponse> {
    const note = await this.dbService.create(newNote);
    return { note };
  }

  async update(updatedNote: UpdateNoteDto): Promise<NoteResponse> {
    const note = await this.dbService.update(updatedNote);
    return { note };
  }

  async delete(id: string, userId: string): Promise<DeleteNoteResponse> {
    const note = await this.dbService.delete(id, userId);
    return { success: !!note };
  }
}
