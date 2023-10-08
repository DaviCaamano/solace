import { DragEvent, PropsWithChildren, useState } from 'react';
import { AddNoteButton, RemoveNoteButton } from '../buttons';
import { LinkedNote, NotebookDragEvents, UnsafeAddNoteTrigger, UnsafeDeleteNoteTrigger } from '#interfaces/notes';
import styles from '../notebook.module.css';
import { AddChildRow } from './AddChildRow';

interface NoteRowProps extends PropsWithChildren {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  dragEvents: NotebookDragEvents;
  level?: number;
  name: string;
  note: LinkedNote;
  openEditor: (title: string, content: string, id?: string) => void;
  userId: string | undefined;
}
export const NoteRow = ({
  addNote,
  children,
  deleteNote,
  dragEvents,
  level = 0,
  name,
  note,
  openEditor,
  userId,
}: NoteRowProps) => {
  const [createChildToggle, setCreateChildToggle] = useState<boolean>(false);

  const deleteNoteOnClick = () => {};
  const sendNoteToEditor = () => {
    openEditor(note.title, note.content, note.id);
  };

  //TODO FOR NOTE ROW:
  // [Done] Send Note to Editor
  // [Done] Allow creation of child note
  // Allow Deletion of Note
  // [Done] Display Note Children
  //    [Done] Recursively display children of children
  // Allow Drag re-ordering of children ((SEE TODO IN notes.slice.ts))
  //    Allow change in dept of Note as part of reordering

  const submitChildNote = (title: string) => {
    if (userId) {
      addNote({
        userId,
        title,
        parentId: note.id,
      });
    }
  };

  const marginLeft = level * 0.75 + 'rem';
  return (
    <div
      className={`note-row ${name} ${styles.noteRow}`}
      data-testid={name}
      style={{ marginLeft: marginLeft, width: `calc(100% - ${marginLeft})` }}
      draggable
      {...dragEvents(note.id)}
    >
      <div className={`note-row-parent ${styles.noteRowParent} h-8 w-full flex flex-row pl-4`}>
        <div
          className={'note-title flex-1 h-8 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer'}
          onClick={sendNoteToEditor}
        >
          {note.title}
        </div>
        <RowButtons
          createChildToggle={() => {
            setCreateChildToggle(true);
          }}
          deleteNote={deleteNoteOnClick}
        />
      </div>
      <AddChildRow onSubmit={submitChildNote} setToggle={setCreateChildToggle} toggle={createChildToggle} />
      {children}
    </div>
  );
};

interface RowButtonsProps {
  deleteNote: () => void;
  createChildToggle: Setter<boolean>;
}
const RowButtons = ({ createChildToggle, deleteNote }: RowButtonsProps) => {
  return (
    <div className={'row-buttons-container w-16 h-8'}>
      <div className={`row-buttons ${styles.noteRowButtons} h-full flex-row justify-center items-center`}>
        <AddNoteButton onClick={() => createChildToggle(true)} />
        <div className={'ml-2'} />
        <RemoveNoteButton onClick={deleteNote} />
        <div className={'mr-2'} />
      </div>
    </div>
  );
};
