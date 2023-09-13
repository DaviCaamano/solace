"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteEndpoint = void 0;
var http_1 = require("#interfaces/http");
var deleteNoteEndpoint = function (builder) {
    return builder.mutation({
        query: function (body) { return ({
            url: '/note',
            method: http_1.HttpMethod.delete,
            body: body,
        }); },
        transformResponse: function (_a) {
            var note = _a.data;
            return (note === null || note === void 0 ? void 0 : note.success) || false;
        },
        invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    });
};
exports.deleteNoteEndpoint = deleteNoteEndpoint;
