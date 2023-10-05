import { NoteRow } from '@components/notebook/rows/NoteRow';
import { LinkedNote, UnsafeAddNoteTrigger, UnsafeDeleteNoteTrigger } from '#interfaces/notes';

interface NoteListProps {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  level?: number;
  noteList?: LinkedNote[] | undefined;
  setEditor: (title: string, content: string) => void;
  userId: string | undefined;
}
export const NoteList = ({ addNote, deleteNote, level = 0, noteList, setEditor, userId }: NoteListProps) => {
  if (!noteList?.length) {
    return null;
  }

  return noteList?.map((note, index) => (
    <NoteRow
      key={'note-row-' + index}
      name={'note-row-' + index}
      note={note}
      addNote={addNote}
      deleteNote={deleteNote}
      level={level}
      setEditor={setEditor}
      userId={userId}
    >
      <NoteList
        addNote={addNote}
        deleteNote={deleteNote}
        level={level + 1}
        noteList={note.children}
        setEditor={setEditor}
        userId={userId}
      />
    </NoteRow>
  ));
};
