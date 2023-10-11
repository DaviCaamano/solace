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

export enum NoteStatus {
  active = 'ACTIVE',
  deleted = 'DELETED',
}

export enum MoveNotePosition {
  childOf = 'childOf', //Move Note to position ahead of that targeted note
  aheadOf = 'previous_row', //Move Note so that it is the first child of the targeted note
  lastNote = 'last_note', //Move Note to be a root note in the last position
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

export interface SuccessNoteResponse {
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

/** Drag Row Types */
interface DragPos {
  x: number;
  y: number;
}
export interface DragRowHandlers {
  onStart: (event: DragEvent<HTMLDivElement>) => void;
  onStop: (event: DragEvent<HTMLDivElement>) => void;
  position: DragPos | undefined;
}
export interface DragMouseHandlers {
  row: { onMouseEnter: () => void; onMouseLeave: () => void };
  zone: (moveType: MoveNotePosition) => { onMouseEnter: () => void };
}
export interface DragNoteHandlers {
  dragHandlers: DragRowHandlers;
  mouseHandlers: DragMouseHandlers;
}

export interface DraggedNotes {
  beingDragged: TreeNote | undefined;
  hoveredOver: TreeNote | undefined;
  moveType: MoveNotePosition | undefined;
  disabled: string[];
}
export interface NotebookDragEvents {
  handlers: (note: TreeNote) => DragNoteHandlers;
  state: DraggedNotes;
}

export type NoteLinage = {
  id: string;
  depth: number;
};
