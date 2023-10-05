import { CreateNoteDto, DeleteNoteDto } from '~note/dto/note.dto';

export interface Note {
  id: string;
  title: string;
  content: string;
  parentId?: string;
  siblingId?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: NoteStatus;
}

export interface LinkedNote extends Note {
  children?: LinkedNote[];
}
export enum NoteStatus {
  active = 'ACTIVE',
  deleted = 'DELETED',
}

type NoteWithoutTimeSTamps = Omit<Note, 'createdAt' | 'updatedAt'>;
export type NoteUpdate = Partial<NoteWithoutTimeSTamps> & Pick<Note, 'id'>;

export interface NoteResponse {
  note: Note;
}

export interface ListNotesResponse {
  notes: Note[];
}

export interface DeleteNoteResponse {
  success: boolean;
}

export interface UnsafeCreateNoteDto extends Omit<CreateNoteDto, 'userId'> {
  userId?: string;
}
export interface UnsafeDeleteNoteDto extends Omit<DeleteNoteDto, 'userId'> {
  userId?: string;
}
export type UnsafeAddNoteTrigger = (newNote: UnsafeCreateNoteDto) => void;
export type UnsafeDeleteNoteTrigger = (deleteDto: UnsafeDeleteNoteDto) => void;
