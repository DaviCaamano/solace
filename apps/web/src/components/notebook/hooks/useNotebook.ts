import {
  AddNoteHandlers,
  DeleteNoteHandler,
  NewNoteToggle,
  Note,
  NotebookDragEvents,
  TreeNote,
  UnsafeCreateNoteDto,
} from '#interfaces/notes';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ContentWindow } from '@interface/Landing';
import { CreateNoteDto } from '~note/dto/note.dto';
import { useDraggableRow } from '@components/notebook/hooks/useDraggableRow';
import { useAddNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Editor, EditorViewMode } from '@interface/editor';

type OpenEditorCallback = (editor: Editor) => void;
/** Detects the creation of a new note and moves the user to the editor to edit that note */
export const useNotebook = (
  window: ContentWindow,
  noteList: Note[] | undefined,
  setWindow: Setter<ContentWindow>,
  setEditor: (editor: Partial<Editor>) => void,
  userId?: string,
): [AddNoteHandlers, DeleteNoteHandler, OpenEditorCallback, NotebookDragEvents] => {
  const [addNote] = useAddNoteMutation();

  /**
   * Mark a note for deletion, this will raise a modal which will prompt the user to confirm the deletion.
   */
  const [markDelete, setMarkDelete] = useState<TreeNote | undefined>(undefined);

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
      setWindow,
    });
  }, [noteAdded, noteList, setWindow, setEditor]);

  const addNoteCallback = (newNote: UnsafeCreateNoteDto) => {
    if (newNote?.userId) {
      setNoteAdded(true);
      addNote(newNote as CreateNoteDto);
    }
    setNewNoteToggle(undefined);
  };

  const deleteNoteHandler: DeleteNoteHandler = {
    markDelete,
    setMarkDelete,
  };

  const openEditor = ({ content, id, stale, title, viewMode }: Editor) => {
    setEditor({ content: content || '', title, id, stale });
    console.log('~~~~', 2);
    if (viewMode === EditorViewMode.editor && window !== ContentWindow.editor) {
      setWindow(ContentWindow.editor);
    } else if (viewMode === EditorViewMode.preview && window !== ContentWindow.notebook) {
      setWindow(ContentWindow.notebook);
    }
  };

  const addNoteToggle: AddNoteHandlers = { addNote: addNoteCallback, newNoteToggle, setNewNoteToggle };
  return [addNoteToggle, deleteNoteHandler, openEditor, dragEvents];
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
  setEditor: (editor: Partial<Editor>) => void;
  setWindow: Setter<ContentWindow>;
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
 * @param setWindow
 */
const handleNewNote = ({ noteList, stickyList, noteAdded, setNoteAdded, setEditor, setWindow }: HandleNewNoteArgs) => {
  if (noteList?.length !== stickyList.current?.length) {
    const stickyNotes = stickyList.current;
    if (noteAdded && noteList && stickyNotes) {
      const newNote: Note | undefined = getNewNote(noteList, stickyNotes);
      setNoteAdded(false);
      stickyList.current = noteList;
      if (newNote) {
        setEditor({ title: newNote.title, content: '', id: newNote.id, stale: false });
        console.log('~~~~', 3);
        setWindow(ContentWindow.editor);
      }
    } else {
      stickyList.current = noteList;
    }
  } else {
    stickyList.current = noteList;
  }
};
