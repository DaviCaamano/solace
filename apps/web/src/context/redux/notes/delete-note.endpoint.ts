import { Note } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';

export const deleteNoteEndpoint = (builder: ReduxEndpoint) =>
  builder.mutation({
    query: (userId: string, noteId: string) => ({
      url: `/notes/${userId}`,
      method: HttpMethod.delete,
      body: { noteId },
    }),
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
