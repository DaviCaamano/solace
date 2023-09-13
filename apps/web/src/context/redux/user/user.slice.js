"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoginMutation = exports.userSlice = void 0;
var user_1 = require("@context/redux/user");
var api_1 = require("@context/redux/api");
exports.userSlice = api_1.apiSlice.injectEndpoints({
    endpoints: function (builder) { return ({
        login: (0, user_1.loginEndpoint)(builder),
    }); },
});
/** Manually Typing Hooks for Intellij incompatibility with Redux Toolkit Query */
exports.useLoginMutation = exports.userSlice.endpoints.login
    .useMutation;
