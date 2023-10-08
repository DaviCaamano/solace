import { CreateNoteDto, DeleteNoteDto } from '~note/dto/note.dto';
import { DragEvent } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  parentId?: string;
  next?: string;
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

export interface TreeNote extends Note {
  depth: number;
  children?: TreeNote[]; //Not provided by Backend
}

export interface ListNotesResponse {
  notes: TreeNote[];
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

export interface NotebookDragEventsHandlers {
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: DragEvent<HTMLDivElement>) => void;
}
export type NotebookDragEvents = (noteId: string) => NotebookDragEventsHandlers;
