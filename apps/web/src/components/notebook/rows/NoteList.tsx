import { NoteRow } from '@components/notebook/rows/NoteRow';
import {
  NotebookDragEvents,
  NoteLinage,
  TreeNote,
  UnsafeAddNoteTrigger,
  UnsafeDeleteNoteTrigger,
} from '#interfaces/notes';
interface NoteListProps {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  depth?: number;
  dragHandlers: NotebookDragEvents;
  noteLinage?: NoteLinage[];
  noteList?: TreeNote[] | undefined;
  openEditor: (title: string, content: string, id?: string) => void;
  userId: string | undefined;
}

export const NoteList = ({
  addNote,
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
          name={'note-row-' + index}
          note={note}
          addNote={addNote}
          deleteNote={deleteNote}
          depth={depth}
          dragHandlers={dragHandlers}
          openEditor={openEditor}
          userId={userId}
        />
        <NoteList
          addNote={addNote}
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
