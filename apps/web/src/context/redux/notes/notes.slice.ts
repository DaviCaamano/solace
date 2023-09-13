import { createSelector } from '@reduxjs/toolkit';
import { DeleteNoteResponse, Note, NoteResponse } from '#interfaces/notes';
import { apiSlice } from '@context/redux/api';
import {
  ReduxQueryBuilder,
  UseLazyQueryHook,
  UseMutationHook,
  UseQueryHook,
} from '#interfaces/redux';

//endpoints
import { listNotesEndpoint } from '@context/redux/notes/list-notes.endpoint';
import { addNoteEndpoint } from '@context/redux/notes/add-note.endpoint';
import { updateNoteEndpoint } from '@context/redux/notes/update-note.endpoint';
import { deleteNoteEndpoint } from '@context/redux/notes/delete-note.endpoint';
import {
  CreateNoteDto,
  DeleteNoteDto,
  GetNoteDto,
  ListNotesDto,
  UpdateNoteDto,
} from '~note/dto/note.dto';
import { getNotesEndpoint } from '@context/redux/notes/get-note.endpoint';

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

/** Manually Typing Hooks for Intellij incompatibility with Redux Toolkit Query */
export const useListNotesQuery = notesSlice.endpoints.listNotes
  .useQuery as UseQueryHook<ListNotesDto, Note[], 'Note'>;
export const useListNotesLazyQuery = notesSlice.endpoints.listNotes
  .useQuery as UseLazyQueryHook<ListNotesDto, Note[], 'Note'>;
export const useGetNoteQuery = notesSlice.endpoints.getNote
  .useQuery as UseQueryHook<GetNoteDto, Note | null, 'Note'>;
export const useGetNoteLazyQuery = notesSlice.endpoints.getNote
  .useQuery as UseLazyQueryHook<GetNoteDto, Note | null, 'Note'>;
export const useAddNoteMutation = notesSlice.endpoints.addNote
  .useMutation as UseMutationHook<CreateNoteDto, Note | null, 'Note'>;
export const useUpdateNoteMutation = notesSlice.endpoints.updateNote
  .useMutation as UseMutationHook<UpdateNoteDto, Note | null, 'Note'>;
export const useDeleteNoteMutation = notesSlice.endpoints.deleteNote
  .useMutation as UseMutationHook<DeleteNoteDto, boolean, 'Note'>;
