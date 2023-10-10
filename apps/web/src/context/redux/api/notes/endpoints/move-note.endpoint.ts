import { NoteUpdate, SuccessNoteResponse } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { MoveNoteDto } from '~note/dto/note.dto';

export const moveNoteEndpoint = (builder: ReduxQueryBuilder) =>
  builder.mutation<boolean, MoveNoteDto>({
    query: (note: NoteUpdate) => ({
      url: '/note/move',
      method: HttpMethod.put,
      body: note,
    }),
    transformResponse: ({ data: note }: FetchResponse<SuccessNoteResponse>) => {
      return note?.success || false;
    },
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
