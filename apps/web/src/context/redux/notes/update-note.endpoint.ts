import { Note, NoteUpdate } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';

export const updateNoteEndpoint = (builder: ReduxEndpoint) =>
  builder.mutation({
    query: (note: NoteUpdate) => ({
      url: '/note',
      method: HttpMethod.put,
      body: note,
    }),
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
