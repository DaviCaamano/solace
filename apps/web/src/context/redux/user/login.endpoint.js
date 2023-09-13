"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginEndpoint = void 0;
var http_1 = require("#interfaces/http");
var redux_1 = require("@utils/redux");
var loginEndpoint = function (builder) {
    return builder.mutation({
        query: function (user) { return ({
            url: '/user/login',
            method: http_1.HttpMethod.post,
            body: user,
        }); },
        transformResponse: function (resp) {
            return resp === null || resp === void 0 ? void 0 : resp.user;
        },
        transformErrorResponse: redux_1.transformErrorResponse,
        invalidatesTags: [{ type: 'User' }, { type: 'Note', id: 'LIST' }],
    });
};
exports.loginEndpoint = loginEndpoint;
