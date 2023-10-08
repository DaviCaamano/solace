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

  @IsOptional()
  content?: string;

  @IsOptional()
  parentId?: string;

  @IsOptional()
  next?: string;
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
  head: string;

  @IsOptional()
  next: string;

  @IsOptional()
  status: NoteStatus;
}

export class DeleteNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;
}
