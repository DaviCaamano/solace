"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiSlice = void 0;
var react_1 = require("@reduxjs/toolkit/query/react");
var baseUrl = process.env.BASE_URL || 'http://localhost:3000';
exports.apiSlice = (0, react_1.createApi)({
    reducerPath: 'api',
    baseQuery: (0, react_1.fetchBaseQuery)({
        baseUrl: baseUrl + '/api/',
    }),
    tagTypes: ['Note', 'User'],
    endpoints: function () { return ({}); },
});
