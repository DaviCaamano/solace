import {
  Note,
  UnsafeAddNoteTrigger,
  UnsafeCreateNoteDto,
  UnsafeDeleteNoteDto,
  UnsafeDeleteNoteTrigger,
} from '#interfaces/notes';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ContentWindow } from '@interface/Landing';
import { useAddNoteMutation, useDeleteNoteMutation } from '@context/redux/api/notes/notes.slice';
import { CreateNoteDto, DeleteNoteDto } from '~note/dto/note.dto';

/** Detects the creation of a new note and moves the user to the editor to edit that note */
export const useNote = (
  noteList: Note[] | undefined,
  setContentWindow: Setter<ContentWindow>,
  setEditor: (title: string, content: string) => void,
): [UnsafeAddNoteTrigger, UnsafeDeleteNoteTrigger] => {
  const [addNote] = useAddNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  /** Denotes when we are expecting a newly created Note to be reported */
  const [noteAdded, setNoteAdded] = useState<boolean>(false);
  const stickyList = useRef<Note[] | undefined>();

  /** Detect when a new note was both expected and added then move user to editor to edit new note. */
  useEffect(() => {
    handleNewNote({
      noteList,
      stickyList,
      noteAdded,
      setNoteAdded,
      setEditor,
      setContentWindow,
    });
  }, [noteAdded, noteList, setContentWindow, setEditor]);

  const addNoteCallback = (newNote: UnsafeCreateNoteDto) => {
    if (newNote?.userId) {
      setNoteAdded(true);
      addNote(newNote as CreateNoteDto);
    }
  };
  const deleteNoteCallback = (newNote: UnsafeDeleteNoteDto) => {
    if (newNote?.userId) {
      deleteNote(newNote as DeleteNoteDto);
    }
  };
  return [addNoteCallback, deleteNoteCallback];
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

type NoteList = Note[] | undefined;
interface HandleNewNoteArgs {
  noteList: NoteList;
  stickyList: MutableRefObject<NoteList>;
  noteAdded: boolean;
  setNoteAdded: Setter<boolean>;
  setEditor: (title: string, content: string) => void;
  setContentWindow: Setter<ContentWindow>;
}

/**
 * Detect when noteList has been updated to include a new note which we were
 * expecting.
 * Update the stickyList ref when noteList has been updated.
 *
 * @param noteList - List of Notes belonging to the logged in user.
 * @param stickyList - Copy of the above list for the purposes of detecting changes.
 * @param noteAdded - flag to indicate that we are expecting a new note to be added.
 * @param setNoteAdded
 * @param setEditor
 * @param setContentWindow
 */
const handleNewNote = ({
  noteList,
  stickyList,
  noteAdded,
  setNoteAdded,
  setEditor,
  setContentWindow,
}: HandleNewNoteArgs) => {
  if (noteList?.length !== stickyList.current?.length) {
    const stickyNotes = stickyList.current;
    if (noteAdded && noteList && stickyNotes) {
      const newNoteTitle = getNewNote(noteList, stickyNotes)?.title;
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
};
