import { Module } from '@nestjs/common';
import { NoteController } from '~note/note.controller';
import { NoteService } from '~note/note.service';
import { NoteDatabaseService } from '~note/note-database.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService, NoteDatabaseService],
})
export class NoteModule {}
