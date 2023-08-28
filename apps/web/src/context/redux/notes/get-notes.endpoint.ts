import { Note, NoteStatus } from '#interfaces/notes';
import { EntityAdapter, EntityState } from '@reduxjs/toolkit';

export const getNotesEndpoint = (
  builder: ReduxEndpoint,
  notesAdapter: EntityAdapter<Note>,
  initialState: EntityState<Note>,
) =>
  builder.query<Note[], void>({
    query: (userId: string) => `/notes/${userId}`,
    transformResponse: ({ data: notes }: FetchResponse<Note[]>) => {
      notes.filter((notes: Note) => notes.status === NoteStatus.active);
      return notesAdapter.setAll(initialState, notes);
    },
    providesTags: (result, error, arg) => {
      console.log('Provide Tags is running:', { result, error, arg });
      return [
        { type: 'Note', id: 'LIST' },
        ...result?.ids.map((id) => ({ type: 'Note', id })),
      ];
    },
  });
