"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLogin = void 0;
var client_1 = require("@auth0/nextjs-auth0/client");
var react_1 = require("react");
var user_1 = require("@context/redux/user");
var useLogin = function () {
    var _a = (0, client_1.useUser)(), authZeroUser = _a.user, authZeroError = _a.error, authZeroIsLoading = _a.isLoading;
    var _b = user_1.useLoginMutation === null || user_1.useLoginMutation === void 0 ? void 0 : (0, user_1.useLoginMutation)({
        fixedCacheKey: 'login',
    }), login = _b[0], _c = _b[1], user = _c.data, error = _c.error, isLoading = _c.isLoading, isSuccess = _c.isSuccess;
    (0, react_1.useEffect)(function () {
        if (authZeroUser && user && detectUserChange(user, authZeroUser)) {
            login({
                zeroId: authZeroUser.sub,
                email: authZeroUser.email,
                name: authZeroUser.name || undefined,
                nickname: authZeroUser.nickname || undefined,
                picture: authZeroUser.picture || undefined,
            }).unwrap();
        }
    }, [authZeroUser, login, user]);
    return {
        isLoading: authZeroIsLoading || isLoading,
        user: isSuccess ? user : undefined,
        error: ((authZeroError === null || authZeroError === void 0 ? void 0 : authZeroError.message) ||
            authZeroError ||
            (error === null || error === void 0 ? void 0 : error.message) ||
            error),
    };
};
exports.useLogin = useLogin;
var detectUserChange = function (user, authZeroUser) {
    var validAuthZeroUser = (authZeroUser === null || authZeroUser === void 0 ? void 0 : authZeroUser.email) && (authZeroUser === null || authZeroUser === void 0 ? void 0 : authZeroUser.sub);
    var userLoggedIn = validAuthZeroUser && !user;
    var userUpdated = user &&
        (authZeroUser === null || authZeroUser === void 0 ? void 0 : authZeroUser.email) &&
        (user.name !== authZeroUser.name ||
            user.email !== authZeroUser.email ||
            user.nickname !== authZeroUser.nickname ||
            user.picture !== authZeroUser.picture);
    return !!validAuthZeroUser && (userLoggedIn || !!userUpdated);
};
