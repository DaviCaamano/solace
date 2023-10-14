import styles from '@components/notebook/notebook.module.scss';
import WestIcon from '@mui/icons-material/West';
import { DeleteNoteHandler, NotebookDragEvents, TreeNote } from '#interfaces/notes';

import { Editor } from '@interface/editor';
import React from 'react';
import { HeaderBackButton } from './HeaderBackButton';
import { NoteSettingsButton } from './NoteSettingsButton';

interface NotebookHeader {
  deleteNoteHandler: DeleteNoteHandler;
  dragEvents: NotebookDragEvents;
  selectedNote: TreeNote | undefined;
  noteList: TreeNote[] | undefined;
  setEditor: (editor: Partial<Editor>) => void;
}

export const NotebookHeader = ({
  deleteNoteHandler,
  dragEvents: { state },
  selectedNote,
  noteList,
  setEditor,
}: NotebookHeader) => {
  const rowBeingDragged = !!state.beingDragged;

  const showBackButton = !rowBeingDragged && !!selectedNote && !!noteList;
  return (
    <div id={'notebook-header'} className={`${styles.header} ${rowBeingDragged ? '' : ''}`}>
      <DragIndicator show={rowBeingDragged} />
      <HeaderBackButton noteList={noteList} show={showBackButton} selectedNote={selectedNote} setEditor={setEditor} />
      <NoteSettingsButton show={showBackButton} selectedNote={selectedNote} deleteNoteHandler={deleteNoteHandler} />
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
