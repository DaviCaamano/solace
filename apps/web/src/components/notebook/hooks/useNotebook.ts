import {
  AddNoteHandlers,
  NewNoteToggle,
  Note,
  NotebookDragEvents,
  UnsafeCreateNoteDto,
  UnsafeDeleteNoteDto,
  UnsafeDeleteNoteTrigger,
} from '#interfaces/notes';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ContentWindow } from '@interface/Landing';
import { useAddNoteMutation, useDeleteNoteMutation } from '@context/redux/api/notes/notes.slice';
import { CreateNoteDto, DeleteNoteDto } from '~note/dto/note.dto';
import { useDraggableRow } from '@components/notebook/hooks/useDraggableRow';

type OpenEditorCallback = (title: string, content?: string, id?: string) => void;
/** Detects the creation of a new note and moves the user to the editor to edit that note */
export const useNotebook = (
  noteList: Note[] | undefined,
  setContentWindow: Setter<ContentWindow>,
  setEditor: (title: string, content: string, id?: string) => void,
  userId?: string,
): [AddNoteHandlers, UnsafeDeleteNoteTrigger, OpenEditorCallback, NotebookDragEvents] => {
  const [addNote] = useAddNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  /**
   * Only one new-note input should display at a time. This state should hold the ID of the note who is
   * creating a child note or 'ROOT' if the notebook is creating a new root note.
   */
  const [newNoteToggle, setNewNoteToggle] = useState<NewNoteToggle>(undefined);
  /** Denotes when we are expecting a newly created Note to be reported */
  const [noteAdded, setNoteAdded] = useState<boolean>(false);
  const stickyList = useRef<Note[] | undefined>();

  const dragEvents = useDraggableRow(userId, setNewNoteToggle);

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
    setNewNoteToggle(undefined);
  };

  const deleteNoteCallback = (newNote: UnsafeDeleteNoteDto) => {
    if (newNote?.userId) {
      deleteNote(newNote as DeleteNoteDto);
    }
  };

  const openEditor = (title: string, content?: string, id?: string) => {
    setEditor(title, content || '', id);
    setContentWindow(ContentWindow.editor);
  };

  const addNoteToggle: AddNoteHandlers = { addNote: addNoteCallback, newNoteToggle, setNewNoteToggle };
  return [addNoteToggle, deleteNoteCallback, openEditor, dragEvents];
};

/**
 * Return Note not already counted in the stickyNote ref.
 * @param noteList : Note[] - List of notes queried by RTK Query
 * @param stickyNoteList : Note[] - List of notes recorded by what was queried by RTK Query
 *      This is used to detect when a new entry has been added.
 *      If that entry was expected (noteAdded state set to true;
 */
const getNewNote = (noteList: Note[], stickyNoteList: Note[] | undefined): Note | undefined => {
  return noteList?.find(({ id }: Note) => {
    const matchingStickyNote: Note | undefined = stickyNoteList?.find(({ id: stickyId }: Note) => id === stickyId);
    return !matchingStickyNote;
  });
};

type NoteList = Note[] | undefined;
interface HandleNewNoteArgs {
  noteList: NoteList;
  stickyList: MutableRefObject<NoteList>;
  noteAdded: boolean;
  setNoteAdded: Setter<boolean>;
  setEditor: (title: string, content: string, id?: string) => void;
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
      const newNote: Note | undefined = getNewNote(noteList, stickyNotes);
      setNoteAdded(false);
      stickyList.current = noteList;
      if (newNote) {
        setEditor(newNote.title, '', newNote.id);
        setContentWindow(ContentWindow.editor);
      }
    } else {
      stickyList.current = noteList;
    }
  } else {
    stickyList.current = noteList;
  }
};
