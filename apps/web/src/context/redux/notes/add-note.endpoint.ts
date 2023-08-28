import { NewNote, Note } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';

export const addNoteEndpoint = (builder: ReduxEndpoint) =>
  builder.mutation({
    query: (note: NewNote) => ({
      url: `/note/${note.userId}`,
      method: HttpMethod.post,
      body: note,
    }),
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
