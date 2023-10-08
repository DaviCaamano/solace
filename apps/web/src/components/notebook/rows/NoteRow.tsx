import React, { PropsWithChildren, useState } from 'react';
import {
  DraggedNotes,
  TreeNote,
  NotebookDragEvents,
  UnsafeAddNoteTrigger,
  UnsafeDeleteNoteTrigger,
} from '#interfaces/notes';
import styles from '../notebook.module.css';
import { AddChildRow } from './AddChildRow';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { RowButtons } from '../buttons';
import { DragRowWrapper, rowTargetCss } from '@components/notebook';

type OpenEditor = (title: string, content: string, id?: string) => void;
interface NoteRowProps extends PropsWithChildren {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  drag: NotebookDragEvents;
  descendants: string[];
  level?: number;
  name: string;
  note: TreeNote;
  openEditor: OpenEditor;
  userId: string | undefined;
}
export const NoteRow = ({
  addNote,
  children,
  deleteNote,
  descendants,
  drag,
  level = 0,
  name,
  note,
  openEditor,
  userId,
}: NoteRowProps) => {
  const [createToggle, setCreateToggle] = useState<boolean>(false);

  //TODO FOR NOTE ROW:
  // [Done] Send Note to Editor
  // [Done] Allow creation of child note
  // Allow Deletion of Note
  // [Done] Display Note Children
  //    [Done] Recursively display children of children
  // Allow Drag re-ordering of children ((SEE TODO IN notes.slice.ts))
  //    Allow change in dept of Note as part of reordering

  const addChildSubmit = (title: string) => {
    if (userId) {
      addNote({
        userId,
        title,
        parentId: note.id,
      });
    }
  };

  const handlers = drag(note.id);
  const {
    active: { beingDragged: draggedNote, dropTarget },
  } = handlers;

  return (
    <DragRowWrapper
      containerName={name}
      descendants={descendants}
      beingDragged={draggedNote}
      dropTarget={dropTarget}
      handlers={handlers}
      noteId={note.id}
    >
      <Row
        deleteNote={deleteNote}
        draggedNotes={handlers.active}
        level={level}
        containerName={name}
        note={note}
        openEditor={openEditor}
        setCreateToggle={setCreateToggle}
      />
      <AddChildRow onSubmit={addChildSubmit} setToggle={setCreateToggle} toggle={createToggle} />
      {children}
    </DragRowWrapper>
  );
};

interface RowProps {
  deleteNote: UnsafeDeleteNoteTrigger;
  draggedNotes: DraggedNotes;
  level: number;
  containerName: string;
  note: TreeNote;
  openEditor: OpenEditor;
  setCreateToggle: Setter<boolean>;
}
const Row = ({
  deleteNote,
  draggedNotes: { beingDragged, dropTarget },
  level,
  containerName,
  note,
  openEditor,
  setCreateToggle,
}: RowProps) => {
  const marginRight = 0.5 + level + 'rem';
  const dragButton = `${containerName}-drag-button ${styles.dragIndicator}`;

  const deleteNoteOnClick = () => {};
  const sendNoteToEditor = () => {
    openEditor(note.title, note.content, note.id);
  };

  return (
    <div className={`note-row-parent ${styles.noteRowParent} ${rowTargetCss(beingDragged, dropTarget, note.id)}`}>
      <DragIndicatorIcon className={dragButton} style={{ marginRight, fontSize: '2rem' }} />
      <div
        className={'note-title flex-1 h-8 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer'}
        onClick={() => sendNoteToEditor()}
      >
        {note.title}
      </div>
      <RowButtons
        show={!beingDragged}
        createChildToggle={() => {
          setCreateToggle(true);
        }}
        deleteNote={deleteNoteOnClick}
      />
    </div>
  );
};
