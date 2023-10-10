import { Module } from '@nestjs/common';
import { NoteController } from '~note/note.controller';
import { NoteService } from '~note/services/note.service';
import { NoteDatabaseService } from '~note/services/note-database.service';
import { NoteMoveService } from '~note/services/note-move.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteDatabaseService, NoteMoveService],
})
export class NoteModule {}
