import { NoteRow } from '@components/notebook/rows/NoteRow';
import { NotebookDragEvents, TreeNote, UnsafeAddNoteTrigger, UnsafeDeleteNoteTrigger } from '#interfaces/notes';
interface NoteListProps {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  dragEvents: NotebookDragEvents;
  level?: number;
  noteList?: TreeNote[] | undefined;
  openEditor: (title: string, content: string, id?: string) => void;
  userId: string | undefined;
}
export const NoteList = ({
  addNote,
  deleteNote,
  dragEvents,
  level = 0,
  noteList,
  openEditor,
  userId,
}: NoteListProps) => {
  if (!noteList?.length) {
    return null;
  }

  return noteList?.map((note, index) => (
    <div className={'note-row-container w-full'}>
      <NoteRow
        key={'note-row-' + index}
        name={'note-row-' + index}
        note={note}
        addNote={addNote}
        deleteNote={deleteNote}
        descendants={getDescendantIds(note)}
        level={level}
        openEditor={openEditor}
        userId={userId}
        drag={dragEvents}
      />
      <NoteList
        addNote={addNote}
        deleteNote={deleteNote}
        level={level + 1}
        noteList={note.children}
        openEditor={openEditor}
        userId={userId}
        dragEvents={dragEvents}
      />
    </div>
  ));
};

const getDescendantIds = (note: TreeNote, list: string[] = []) => {
  list.push(note.id);
  if (note.children) {
    for (let child of note.children) {
      getDescendantIds(child, list);
    }
  }
  return list;
};
