"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformErrorResponse = void 0;
var transformErrorResponse = function (resp) {
    var code = resp.statusCode || resp.status;
    var status = typeof code === 'string' ? " [".concat(resp.status, "] ") : '';
    if (!resp) {
        return "ERROR:".concat(status, " No response received.");
    }
    if (typeof resp === 'string') {
        return "".concat(resp).concat(status);
    }
    if (resp === null || resp === void 0 ? void 0 : resp.data) {
        if (Array.isArray(resp.data.message)) {
            return status + resp.data.message.join('\n');
        }
        if (typeof resp.data.message === 'string') {
            return status + resp.data.message;
        }
        if (typeof resp.data === 'object') {
            return status + JSON.stringify(resp.data);
        }
        if (typeof resp.data === 'string') {
            return resp.data;
        }
    }
    if (typeof resp === 'object') {
        return status + JSON.stringify(resp);
    }
    return "ERROR:".concat(status, " No response received.");
};
exports.transformErrorResponse = transformErrorResponse;
