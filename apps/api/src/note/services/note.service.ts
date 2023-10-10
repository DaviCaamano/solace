import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { CreateNoteDto, MoveNoteDto, UpdateNoteDto } from '../dto/note.dto';
import { SuccessNoteResponse, ListNotesResponse, NoteResponse } from '#interfaces/notes';
import { NoteDatabaseService } from './note-database.service';
import { NoteMoveService } from './note-move.service';

@Injectable()
export class NoteService extends ComponentWithLogging {
  constructor(
    private readonly dbService: NoteDatabaseService,
    private readonly moveService: NoteMoveService,
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

  list = async (userId: string): Promise<ListNotesResponse> => ({ notes: await this.dbService.list(userId) });

  get = async (id: string, userId: string): Promise<NoteResponse> => ({ note: await this.dbService.get(id, userId) });

  create = async (newNote: CreateNoteDto): Promise<NoteResponse> => ({ note: await this.dbService.create(newNote) });

  update = async (updatedNote: UpdateNoteDto): Promise<NoteResponse> => ({
    note: await this.dbService.update(updatedNote),
  });

  move = async (moveNoteData: MoveNoteDto): Promise<SuccessNoteResponse> => ({
    success: await this.moveService.move(moveNoteData),
  });

  delete = async (id: string, userId: string): Promise<SuccessNoteResponse> => ({
    success: !!(await this.dbService.delete(id, userId)),
  });
}
