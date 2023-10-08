import { ListNotesResponse, Note, NoteStatus, TreeNote } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { GetNoteDto, ListNotesDto } from '~note/dto/note.dto';

export const listNotesEndpoint = (builder: ReduxQueryBuilder<'Note'>) =>
  builder.query<TreeNote[], ListNotesDto>({
    query: (params: GetNoteDto) => ({
      url: '/note/list',
      method: HttpMethod.get,
      params,
    }),
    transformResponse: (notes: ListNotesResponse): TreeNote[] => {
      return notes?.notes?.filter((notes: Note) => notes.status === NoteStatus.active) || [];
    },
    providesTags: [{ type: 'Note', id: 'LIST' }],
  });
