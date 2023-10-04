import { Note } from '#interfaces/notes';
import { useEffect, useRef, useState } from 'react';
import { ContentWindow } from '@interface/Landing';
import { useAddNoteMutation } from '@context/redux/api/notes/notes.slice';
import { CreateNoteDto } from '~note/dto/note.dto';

interface UnsafeNewNote extends Omit<CreateNoteDto, 'userId'> {
  userId?: string;
}
/** Detects the creation of a new note and moves the user to the editor to edit that note */
export const useNewNote = (
  noteList: Note[] | undefined,
  setContentWindow: Setter<ContentWindow>,
  setEditor: (title: string, content: string) => void,
) => {
  const [addNote] = useAddNoteMutation();

  /** Denotes when we are expecting a newly created Note to be reported */
  const [noteAdded, setNoteAdded] = useState<boolean>(false);
  const stickyList = useRef<Note[] | undefined>();

  console.log(
    `
  
  !!noteList`,
    noteList?.length,
    stickyList.current?.length,
  );
  /** Detect when a new note was both expected and added then move user to editor to edit new note. */
  useEffect(() => {
    if (noteList?.length !== stickyList.current?.length) {
      const stickyNotes = stickyList.current;
      console.log(
        'noteAdded && noteList && stickyNotes',
        noteAdded && noteList && stickyNotes,
        '|',
        noteAdded,
        noteList?.length,
        stickyNotes,
      );
      if (noteAdded && noteList && stickyNotes) {
        const newNoteTitle = getNewNote(noteList, stickyNotes)?.title;
        console.log('newNote', newNoteTitle, '|', noteList.length, stickyNotes?.length);
        setNoteAdded(false);
        stickyList.current = noteList;
        if (newNoteTitle) {
          setEditor(newNoteTitle, '');
          setContentWindow(ContentWindow.editor);
        }
      } else {
        stickyList.current = noteList;
      }
    } else {
      stickyList.current = noteList;
    }
  }, [noteAdded, noteList, setContentWindow, setEditor]);

  return (newNote: UnsafeNewNote) => {
    console.log('Ran');
    if (newNote?.userId) {
      setNoteAdded(true);
      addNote(newNote as CreateNoteDto);
    }
  };
};

/**
 * Return Note not already counted in the stickyNote ref.
 * @param noteList : Note[] - List of notes queried by RTK Query
 * @param stickyNoteList : Note[] - List of notes recorded by what was queried by RTK Query
 *      This is used to detect when a new entry has been added.
 *      If that entry was expected (noteAdded state set to true;
 */
const getNewNote = (noteList: Note[], stickyNoteList: Note[] | undefined) => {
  console.log('noteList', noteList?.length);
  return noteList?.find(({ id }: Note) => {
    const matchingStickyNote: Note | undefined = stickyNoteList?.find(({ id: stickyId }: Note) => {
      if (id === stickyId) console.log('~ MATCH ~', id);
      else console.log('-nomatch-', id);
      return id === stickyId;
    });
    console.log('matchingStickyNote', id, !matchingStickyNote, '|', noteList.length, stickyNoteList?.length);
    return !matchingStickyNote;
  });
};
