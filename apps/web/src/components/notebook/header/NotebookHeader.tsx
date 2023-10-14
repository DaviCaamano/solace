import styles from '@components/notebook/notebook.module.scss';
import WestIcon from '@mui/icons-material/West';
import { NotebookDragEvents, TreeNote } from '#interfaces/notes';

import { Editor, EditorViewMode } from '@interface/editor';
import React from 'react';
import { HeaderBackButton } from './HeaderBackButton';
import { NoteSettingsButton } from './NoteSettingsButton';

interface NotebookHeader {
  dragEvents: NotebookDragEvents;
  selectedNote: TreeNote | undefined;
  noteList: TreeNote[] | undefined;
  setEditor: (editor: Partial<Editor>) => void;
}

export const NotebookHeader = ({ dragEvents: { state }, selectedNote, noteList, setEditor }: NotebookHeader) => {
  const rowBeingDragged = !!state.beingDragged;
  const goBack = () => {
    if (noteList) {
      /** Selected Note is a root note */
      if (selectedNote?.parentId === null) {
        /** Unselect Note */
        return setEditor({
          id: undefined,
          content: undefined,
          title: undefined,
          stale: false,
          viewMode: EditorViewMode.preview,
        });
      }
      /** Not Root Note, so find the parent of the currently selected note and select it instead */
      const newParent = noteList.find(({ id }: TreeNote) => selectedNote?.parentId === id);
      if (newParent) {
        const { id, content, title } = newParent;
        setEditor({ id, content, title, stale: false, viewMode: EditorViewMode.preview });
      }
    }
  };
  const showBackButton = !rowBeingDragged && !!selectedNote && !!noteList;
  return (
    <div id={'notebook-header'} className={`${styles.header} ${rowBeingDragged ? '' : ''}`}>
      <DragIndicator show={rowBeingDragged} />
      <HeaderBackButton show={showBackButton} onClick={goBack} />
      <NoteSettingsButton />
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
