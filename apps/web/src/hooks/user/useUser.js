"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = void 0;
var user_1 = require("@context/redux/user");
var useUser = function () {
    var _a = (0, user_1.useLoginMutation)({
        fixedCacheKey: 'login',
    }), login = _a[0], args = _a[1];
    return [];
};
exports.useUser = useUser;
