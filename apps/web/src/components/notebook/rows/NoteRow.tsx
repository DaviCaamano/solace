import React, { PropsWithChildren } from 'react';
import { TreeNote, NotebookDragEvents, AddNoteHandlers } from '#interfaces/notes';
import { AddChildRow } from './AddChildRow';

import { Editor } from '@interface/editor';
import { DragRowWrapper } from './DragRowWrapper';
import { NoteRowBody } from './NoteRowBody';

type OpenEditor = (editor: Editor) => void;
interface NoteRowProps extends PropsWithChildren {
  addNoteHandlers: AddNoteHandlers;
  dragHandlers: NotebookDragEvents;
  depth?: number;
  markDelete: Setter<TreeNote | undefined>;
  name: string;
  note: TreeNote;
  openEditor: OpenEditor;
  userId: string | undefined;
}
export const NoteRow = ({
  addNoteHandlers: { addNote, newNoteToggle, setNewNoteToggle },
  children,
  dragHandlers,
  markDelete,
  name,
  note,
  openEditor,
  userId,
}: NoteRowProps) => {
  const createToggle = newNoteToggle === note.id;
  const setCreateToggle = (flag: boolean) => {
    setNewNoteToggle(flag ? note.id : undefined);
  };

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
          markDelete={markDelete}
          dragHandlers={dragHandlers}
          containerName={name}
          note={note}
          openEditor={openEditor}
          setCreateToggle={setCreateToggle}
        />
        <AddChildRow onSubmit={addChildSubmit} setCreateToggle={setCreateToggle} createToggle={createToggle} />
        {children}
      </DragRowWrapper>
    </div>
  );
};
