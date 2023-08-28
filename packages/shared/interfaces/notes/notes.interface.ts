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

export type NoteUpdate = Partial<Omit<Note, 'id'>>;
export type NewNote = NoteUpdate;
