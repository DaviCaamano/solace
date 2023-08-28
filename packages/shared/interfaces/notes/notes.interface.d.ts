export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    status: NoteStatus;
}
export declare enum NoteStatus {
    active = "ACTIVE",
    deleted = "DELETED"
}
export type NewNote = Omit<Note, 'id'>;
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
export {};
//# sourceMappingURL=notes.interface.d.ts.map