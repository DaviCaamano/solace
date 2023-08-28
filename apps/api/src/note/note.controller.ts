import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import {
  CreateNoteDto,
  DeleteNoteDto,
  GetNoteDto,
  ListNotesDto,
  UpdateNoteDto,
} from '~note/dto/note.dto';
import {
  DeleteNoteResponse,
  ListNotesResponse,
  NoteResponse,
} from '#interfaces/notes';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('list')
  list(@Query() { userId }: ListNotesDto): Promise<ListNotesResponse> {
    return this.noteService.list(userId);
  }

  @Get()
  get(@Query() { id, userId }: GetNoteDto): Promise<NoteResponse> {
    return this.noteService.get(id, userId);
  }

  @Post()
  create(@Body() newNote: CreateNoteDto): Promise<NoteResponse> {
    return this.noteService.create(newNote);
  }

  @Put()
  update(@Body() updatedNote: UpdateNoteDto): Promise<NoteResponse> {
    return this.noteService.update(updatedNote);
  }

  @Delete()
  delete(@Body() { id, userId }: DeleteNoteDto): Promise<DeleteNoteResponse> {
    return this.noteService.delete(id, userId);
  }
}
