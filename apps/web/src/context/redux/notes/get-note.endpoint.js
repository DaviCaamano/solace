"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotesEndpoint = void 0;
var http_1 = require("#interfaces/http");
var getNotesEndpoint = function (builder) {
    return builder.query({
        query: function (params) { return ({
            url: '/note',
            method: http_1.HttpMethod.get,
            params: params,
        }); },
        transformResponse: function (_a) {
            var note = _a.data;
            return (note === null || note === void 0 ? void 0 : note.note) || null;
        },
        providesTags: [{ type: 'Note', id: 'LIST' }],
    });
};
exports.getNotesEndpoint = getNotesEndpoint;
