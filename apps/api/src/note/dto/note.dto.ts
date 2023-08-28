import { IsNotEmpty, IsOptional } from 'class-validator';
import { NoteStatus } from '#interfaces/notes';

export class ListNotesDto {
  @IsNotEmpty()
  userId: string;
}

export class GetNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;
}

export class CreateNoteDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}

export class UpdateNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  status: NoteStatus;
}

export class DeleteNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;
}
