import { NoteRow } from '@components/notebook/NoteRow';
import { Note, UnsafeAddNoteTrigger, UnsafeDeleteNoteTrigger } from '#interfaces/notes';
import { getNoteHeiarchy } from './utils/getNoteHeiarchy';

interface NoteListProps {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  noteList?: Note[] | null;
  setEditor: (title: string, content: string) => void;
}
export const NoteList = ({ addNote, deleteNote, noteList, setEditor }: NoteListProps) => {
  if (!noteList) {
    return null;
  }

  return getNoteHeiarchy(noteList)?.map((note, index) => {
    return (
      <NoteRow key={'note-row-' + index} note={note} addNote={addNote} deleteNote={deleteNote} setEditor={setEditor}>
        {note.children && (
          <NoteList addNote={addNote} deleteNote={deleteNote} noteList={note.children} setEditor={setEditor} />
        )}
      </NoteRow>
    );
  });
};


