"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveNotePosition = exports.NoteStatus = void 0;
var NoteStatus;
(function (NoteStatus) {
    NoteStatus["active"] = "ACTIVE";
    NoteStatus["deleted"] = "DELETED";
})(NoteStatus || (exports.NoteStatus = NoteStatus = {}));
var MoveNotePosition;
(function (MoveNotePosition) {
    MoveNotePosition["childOf"] = "childOf";
    MoveNotePosition["aheadOf"] = "aheadOf";
    MoveNotePosition["lastChildOf"] = "lastChildOf";
    MoveNotePosition["elevate"] = "elevate";
})(MoveNotePosition || (exports.MoveNotePosition = MoveNotePosition = {}));
//# sourceMappingURL=notes.interface.js.map