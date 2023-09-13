"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNoteEndpoint = void 0;
var http_1 = require("#interfaces/http");
var addNoteEndpoint = function (builder) {
    return builder.mutation({
        query: function (body) { return ({
            url: '/note',
            method: http_1.HttpMethod.post,
            body: body,
        }); },
        transformResponse: function (_a) {
            var note = _a.data;
            return (note === null || note === void 0 ? void 0 : note.note) || null;
        },
        invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    });
};
exports.addNoteEndpoint = addNoteEndpoint;
