import { apiSlice } from '@context/redux/api';

//endpoints
import { listNotesEndpoint } from '@context/redux/notes/list-notes.endpoint';
import { addNoteEndpoint } from '@context/redux/notes/add-note.endpoint';
import { updateNoteEndpoint } from '@context/redux/notes/update-note.endpoint';
import { deleteNoteEndpoint } from '@context/redux/notes/delete-note.endpoint';
import { getNotesEndpoint } from '@context/redux/notes/get-note.endpoint';
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
