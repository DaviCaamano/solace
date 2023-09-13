"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteEndpoint = void 0;
var http_1 = require("#interfaces/http");
var updateNoteEndpoint = function (builder) {
    return builder.mutation({
        query: function (note) { return ({
            url: '/note',
            method: http_1.HttpMethod.put,
            body: note,
        }); },
        transformResponse: function (_a) {
            var note = _a.data;
            return (note === null || note === void 0 ? void 0 : note.note) || null;
        },
        invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    });
};
exports.updateNoteEndpoint = updateNoteEndpoint;
