"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeleteNoteMutation = exports.useUpdateNoteMutation = exports.useAddNoteMutation = exports.useGetNoteLazyQuery = exports.useGetNoteQuery = exports.useListNotesLazyQuery = exports.useListNotesQuery = exports.notesSlice = void 0;
var api_1 = require("@context/redux/api");
//endpoints
var list_notes_endpoint_1 = require("@context/redux/notes/list-notes.endpoint");
var add_note_endpoint_1 = require("@context/redux/notes/add-note.endpoint");
var update_note_endpoint_1 = require("@context/redux/notes/update-note.endpoint");
var delete_note_endpoint_1 = require("@context/redux/notes/delete-note.endpoint");
var get_note_endpoint_1 = require("@context/redux/notes/get-note.endpoint");
exports.notesSlice = api_1.apiSlice.injectEndpoints({
    endpoints: function (builder) { return ({
        getNote: (0, get_note_endpoint_1.getNotesEndpoint)(builder),
        listNotes: (0, list_notes_endpoint_1.listNotesEndpoint)(builder),
        addNote: (0, add_note_endpoint_1.addNoteEndpoint)(builder),
        updateNote: (0, update_note_endpoint_1.updateNoteEndpoint)(builder),
        deleteNote: (0, delete_note_endpoint_1.deleteNoteEndpoint)(builder),
    }); },
    overrideExisting: false,
});
/** Manually Typing Hooks for Intellij incompatibility with Redux Toolkit Query */
exports.useListNotesQuery = exports.notesSlice.endpoints.listNotes
    .useQuery;
exports.useListNotesLazyQuery = exports.notesSlice.endpoints.listNotes
    .useQuery;
exports.useGetNoteQuery = exports.notesSlice.endpoints.getNote
    .useQuery;
exports.useGetNoteLazyQuery = exports.notesSlice.endpoints.getNote
    .useQuery;
exports.useAddNoteMutation = exports.notesSlice.endpoints.addNote
    .useMutation;
exports.useUpdateNoteMutation = exports.notesSlice.endpoints.updateNote
    .useMutation;
exports.useDeleteNoteMutation = exports.notesSlice.endpoints.deleteNote
    .useMutation;
