import { Note, NoteResponse } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { CreateNoteDto } from '~note/dto/note.dto';

export const addNoteEndpoint = (builder: ReduxQueryBuilder) =>
  builder.mutation<Note | null, CreateNoteDto>({
    query: (body: CreateNoteDto) => ({
      url: '/note',
      method: HttpMethod.post,
      body,
    }),
    transformResponse: ({ data: note }: FetchResponse<NoteResponse>) => {
      return note?.note || null;
    },
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
