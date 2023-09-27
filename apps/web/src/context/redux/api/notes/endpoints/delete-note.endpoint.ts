import { DeleteNoteResponse } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { DeleteNoteDto } from '~note/dto/note.dto';

export const deleteNoteEndpoint = (builder: ReduxQueryBuilder) =>
  builder.mutation<boolean, DeleteNoteDto>({
    query: (body: DeleteNoteDto) => ({
      url: '/note',
      method: HttpMethod.delete,
      body,
    }),
    transformResponse: ({ data: note }: FetchResponse<DeleteNoteResponse>) => {
      return note?.success || false;
    },
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
