import { apiSlice } from '@context/redux/api';

//endpoints
import { listNotesEndpoint } from '@context/redux/api/notes/list-notes.endpoint';
import { addNoteEndpoint } from '@context/redux/api/notes/add-note.endpoint';
import { updateNoteEndpoint } from '@context/redux/api/notes/update-note.endpoint';
import { deleteNoteEndpoint } from '@context/redux/api/notes/delete-note.endpoint';
import { getNotesEndpoint } from '@context/redux/api/notes/get-note.endpoint';
import { ReduxQueryBuilder } from '#interfaces/redux';

export const notesSlice = apiSlice.injectEndpoints({
  endpoints: (builder: ReduxQueryBuilder<'Note'>) => ({
    getNote: getNotesEndpoint(builder),
    listNotes: listNotesEndpoint(builder),
    addNote: addNoteEndpoint(builder),
    updateNote: updateNoteEndpoint(builder),
    deleteNote: deleteNoteEndpoint(builder),
  }),
  overrideExisting: false,
});

export const {
  useListNotesQuery,
  useLazyListNotesQuery,
  useGetNoteQuery,
  useLazyGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesSlice;
