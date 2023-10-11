import { NoteRow } from '@components/notebook/rows/NoteRow';
import { AddNoteHandlers, NotebookDragEvents, TreeNote, UnsafeDeleteNoteTrigger } from '#interfaces/notes';
interface NoteListProps {
  addNoteHandlers: AddNoteHandlers;
  deleteNote: UnsafeDeleteNoteTrigger;
  depth?: number;
  dragHandlers: NotebookDragEvents;
  noteList?: TreeNote[] | undefined;
  openEditor: (title: string, content: string, id?: string) => void;
  userId: string | undefined;
}

export const NoteList = ({
  addNoteHandlers,
  deleteNote,
  depth = 0,
  dragHandlers,
  noteList,
  openEditor,
  userId,
}: NoteListProps) => {
  if (!noteList?.length) {
    return null;
  }

  return noteList?.map((note, index) => {
    return (
      <div key={`note-row-${note.id}`} className={'note-row-container w-full'}>
        <NoteRow
          addNoteHandlers={addNoteHandlers}
          name={'note-row-' + index}
          note={note}
          deleteNote={deleteNote}
          depth={depth}
          dragHandlers={dragHandlers}
          openEditor={openEditor}
          userId={userId}
        />
        <NoteList
          addNoteHandlers={addNoteHandlers}
          deleteNote={deleteNote}
          depth={depth + 1}
          dragHandlers={dragHandlers}
          noteList={note.children}
          openEditor={openEditor}
          userId={userId}
        />
      </div>
    );
  });
};
