import styles from '@components/notebook/notebook.module.scss';
import WestIcon from '@mui/icons-material/West';
import { DeleteNoteHandler, MoveNotePosition, TreeNote } from '#interfaces/notes';

import { Editor } from '@interface/editor';
import React from 'react';
import { HeaderBackButton } from './HeaderBackButton';
import { NoteSettingsButton } from './NoteSettingsButton';
import { useDraggable, UseDraggableState } from '../hooks/useDraggableRow';
const rootNote: TreeNote = { id: 'ROOT_FIRST' } as TreeNote;

interface NotebookHeader {
  deleteNoteHandler: DeleteNoteHandler;
  dragEvents: UseDraggableState;
  selectedNote: TreeNote | undefined;
  noteList: TreeNote[] | undefined;
  setEditor: (editor: Partial<Editor>) => void;
}

export const NotebookHeader = ({
  deleteNoteHandler,
  dragEvents,
  selectedNote,
  noteList,
  setEditor,
}: NotebookHeader) => {
  const {
    state: { rowDragged },
    handlers,
  } = useDraggable(dragEvents, selectedNote || rootNote);
  const rowBeingDragged = !!rowDragged;

  const showBackButton = !rowBeingDragged && !!selectedNote && !!noteList;
  return (
    <div id={'notebook-header'} className={`${styles.header}`} {...handlers.zone(MoveNotePosition.elevate)}>
      <DragIndicator show={rowBeingDragged} />
      <HeaderBackButton noteList={noteList} show={showBackButton} selectedNote={selectedNote} setEditor={setEditor} />
      <NoteSettingsButton show={showBackButton} selectedNote={selectedNote} deleteNoteHandler={deleteNoteHandler} />
      <Highlight rowDragged={rowBeingDragged} />
    </div>
  );
};

interface DragIndicatorProps {
  show: boolean;
}
const DragIndicator = ({ show }: DragIndicatorProps) => (
  <WestIcon
    className={`${styles.headerDragIcon} ${show ? 'block' : 'hidden'}`}
    style={{ fontSize: '4rem', lineHeight: '100%' }}
  />
);

const Highlight = ({ rowDragged }: { rowDragged: boolean }) => (
  <div
    id={'notebook-header-drag-highlight'}
    className={`${
      rowDragged ? 'block' : 'hidden'
    } absolute w-full h-full top-0 left-0 bg-white opacity-10 cursor-pointer pointer-events-none`}
  />
);
