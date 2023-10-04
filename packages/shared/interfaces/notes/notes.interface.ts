import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query/react';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { CreateNoteDto } from '~note/dto/note.dto';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: NoteStatus;
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

export type AddNoteTrigger = (newNote: CreateNoteDto) => Promise<any>
