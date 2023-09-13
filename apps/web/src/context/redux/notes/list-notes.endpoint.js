"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNotesEndpoint = void 0;
var notes_1 = require("#interfaces/notes");
var http_1 = require("#interfaces/http");
var listNotesEndpoint = function (builder) {
    return builder.query({
        query: function (params) { return ({
            url: '/note',
            method: http_1.HttpMethod.get,
            params: params,
        }); },
        transformResponse: function (_a) {
            var _b;
            var notes = _a.data;
            return (_b = notes === null || notes === void 0 ? void 0 : notes.notes) === null || _b === void 0 ? void 0 : _b.filter(function (notes) { return notes.status === notes_1.NoteStatus.active; });
        },
        providesTags: [{ type: 'Note', id: 'LIST' }],
    });
};
exports.listNotesEndpoint = listNotesEndpoint;
