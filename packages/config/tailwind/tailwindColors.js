"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNestedColor = exports.tailwindColors = void 0;
var tailwindColors = function (enumerable) {
    var json = {};
    Object.keys(enumerable).forEach(function (key) {
        var value = enumerable[key];
        var _a = (0, exports.extractNestedColor)(key), color = _a[0], subColor = _a[1], brightness = _a[2];
        if (!json[color]) {
            json[color] = {};
        }
        if (subColor) {
            if (!json[color][subColor]) {
                json[color][subColor] = {};
            }
            if (brightness) {
                json[color][subColor][brightness] = String(value);
            }
            json[color][subColor] = String(value);
        }
        else {
            json[color][brightness || 'DEFAULT'] = String(value);
        }
    });
    return json;
};
exports.tailwindColors = tailwindColors;
var extractNestedColor = function (original) {
    var _a;
    var numb = ((_a = original.match(/\d/g)) === null || _a === void 0 ? void 0 : _a.join('')) || null;
    var stringWithoutNumber = numb ? original.replace(/\d/g, '') : original;
    var _b = stringWithoutNumber.split('-'), color = _b[0], subColor = _b[1];
    return [color, subColor || null, numb];
};
exports.extractNestedColor = extractNestedColor;
exports.default = exports.tailwindColors;
