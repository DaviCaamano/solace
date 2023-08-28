import { Note, NoteStatus } from '#interfaces/notes';
import { EntityAdapter, EntityState } from '@reduxjs/toolkit';
import { HttpMethod } from '#interfaces/http';

export const getNotesEndpoint = (
  builder: ReduxEndpoint,
  notesAdapter: EntityAdapter<Note>,
  initialState: EntityState<Note>,
) =>
  builder.query<Note[], void>({
    query: (userId: string) => ({
      url: '/note',
      method: HttpMethod.get,
      params: { userId },
    }),
    transformResponse: ({ data: notes }: FetchResponse<Note[]>) => {
      notes.filter((notes: Note) => notes.status === NoteStatus.active);
      return notesAdapter.setAll(initialState, notes);
    },
    providesTags: (result, error, arg) => {
      return Array.isArray(result?.ids)
        ? [
            { type: 'Note', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Note', id })),
          ]
        : [{ type: 'Note', id: 'LIST' }];
    },
  });
