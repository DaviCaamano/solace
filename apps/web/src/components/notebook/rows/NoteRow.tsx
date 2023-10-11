import React, { PropsWithChildren, useState } from 'react';
import {
  TreeNote,
  NotebookDragEvents,
  UnsafeAddNoteTrigger,
  UnsafeDeleteNoteTrigger,
  NoteLinage,
} from '#interfaces/notes';
import { AddChildRow } from './AddChildRow';

import { DragRowWrapper, NoteRowBody } from '@components/notebook';

type OpenEditor = (title: string, content: string, id?: string) => void;
interface NoteRowProps extends PropsWithChildren {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  dragHandlers: NotebookDragEvents;
  depth?: number;
  name: string;
  note: TreeNote;
  openEditor: OpenEditor;
  userId: string | undefined;
}
export const NoteRow = ({
  addNote,
  children,
  deleteNote,
  dragHandlers,
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
  // Allow Drag re-ordering of children
  // [Done] TODO IN notes.slice.ts
  //    [Done] Allow change in dept of Note as part of reordering

  const addChildSubmit = (title: string) => {
    if (userId) {
      addNote({
        userId,
        title,
        parentId: note.id,
      });
    }
  };

  const handlers = dragHandlers.handlers(note);
  const { beingDragged } = dragHandlers.state;

  const expanded = !!beingDragged && beingDragged?.id === note.id;

  return (
    <div className={`note-row-backdrop ${expanded && 'bg-mug-dark'}`}>
      <DragRowWrapper containerName={name} beingDragged={beingDragged} handlers={handlers.dragHandlers} note={note}>
        <NoteRowBody
          deleteNote={deleteNote}
          dragHandlers={dragHandlers}
          containerName={name}
          note={note}
          openEditor={openEditor}
          setCreateToggle={setCreateToggle}
        />
        <AddChildRow onSubmit={addChildSubmit} setToggle={setCreateToggle} toggle={createToggle} />
        {children}
      </DragRowWrapper>
    </div>
  );
};
