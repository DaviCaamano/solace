import React, { PropsWithChildren, useState } from 'react';
import { TreeNote, NotebookDragEvents, UnsafeAddNoteTrigger, UnsafeDeleteNoteTrigger } from '#interfaces/notes';
import { AddChildRow } from './AddChildRow';

import { DragRowWrapper, NoteRowBody } from '@components/notebook';

type OpenEditor = (title: string, content: string, id?: string) => void;
interface NoteRowProps extends PropsWithChildren {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  drag: NotebookDragEvents;
  descendants: string[];
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
  descendants,
  drag,
  depth = 0,
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

  const handlers = drag(note);
  const {
    state: { beingDragged },
    mouseHandlers
  } = handlers;

  const expanded = !!beingDragged && beingDragged?.id === note.id ;

  return (
    <div className={`note-row-backdrop ${expanded && 'bg-mug-dark'}`}>
      <DragRowWrapper
        containerName={name}
        descendants={descendants}
        beingDragged={beingDragged}
        handlers={handlers}
        noteId={note.id}
      >
        <NoteRowBody
          deleteNote={deleteNote}
          draggedState={handlers.state}
          depth={depth}
          containerName={name}
          mouseHandlers={mouseHandlers}
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
