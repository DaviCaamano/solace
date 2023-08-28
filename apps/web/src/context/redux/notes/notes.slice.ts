import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { Note } from '#interfaces/notes';
import { EntityAdapter, EntityState } from '@reduxjs/toolkit';
import { getNotesEndpoint } from '@context/redux/notes/get-notes.endpoint';
import { apiSlice } from '@context/redux/api';
import { addNoteEndpoint } from '@context/redux/notes/add-note.endpoint';
import { updateNoteEndpoint } from '@context/redux/notes/update-note.endpoint';
import { deleteNoteEndpoint } from '@context/redux/notes/delete-note.endpoint';

export const notesAdapter: EntityAdapter<Note> = createEntityAdapter({
  sortComparer: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
});

// console.log('getNotesEndpoint', getNotesEndpoint);
const initialState: EntityState<Note> = notesAdapter.getInitialState();

export const notesSlice = apiSlice.injectEndpoints({
  endpoints: (builder: ReduxEndpoint) => ({
    getNotes: getNotesEndpoint(builder, notesAdapter, initialState),
    addNote: addNoteEndpoint(builder),
    updateNote: updateNoteEndpoint(builder),
    deleteNote: deleteNoteEndpoint(builder),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesSlice;

/** memoized selectors */
export const selectNotesResult = notesSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
  selectNotesResult,
  (postsResult) => postsResult.data, // normalized state object with ids & entities
);

export const {
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  selectEntities: selectNoteEntities,
  selectAll: selectAllNotes,
  selectTotal: selectTotalNotes,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState,
);
