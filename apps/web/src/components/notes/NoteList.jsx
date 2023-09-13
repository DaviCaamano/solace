"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteList = void 0;
var notes_1 = require("@context/redux/notes");
var NoteList = function () {
    var _a = (0, notes_1.useListNotesLazyQuery)(), getNotes = _a[0], args = _a[1];
    var isLoading = args.isLoading, isSuccess = args.isSuccess, isError = args.isError, error = args.error;
    console.log('args', args);
    if (isLoading)
        return <div>Loading...</div>;
    if (isError)
        return <div>{error.message}</div>;
    if (isSuccess) {
        return (<section className={'w-full h-full flex justify-center, items-center'}>
        <h1>Notes</h1>
      </section>);
    }
};
exports.NoteList = NoteList;
