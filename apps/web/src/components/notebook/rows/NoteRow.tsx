import React, { PropsWithChildren } from 'react';
import { TreeNote, AddNoteHandlers } from '#interfaces/notes';
import { AddChildRow } from './AddChildRow';

import { Editor, EditorViewMode } from '@interface/editor';
import { DragRowWrapper } from './DragRowWrapper';
import { NoteRowBody } from './NoteRowBody';
import { MoveRowCallback, useDraggable, UseDraggableState } from '@components/notebook/hooks';

type OpenEditor = (editor: Editor) => void;
interface NoteRowProps extends PropsWithChildren {
  addNoteHandlers: AddNoteHandlers;
  dragHandlers: UseDraggableState;
  depth?: number;
  moveNote: MoveRowCallback;
  name: string;
  note: TreeNote;
  openEditor: OpenEditor;
  userId: string | undefined;
}
export const NoteRow = ({
  addNoteHandlers: { addNote, newNoteToggle, setNewNoteToggle },
  children,
  dragHandlers,
  moveNote,
  name,
  note,
  openEditor,
  userId,
}: NoteRowProps) => {
  const sendNoteToPreview = () =>
    openEditor({
      title: note.title,
      content: note.content,
      id: note.id,
      stale: false,
      viewMode: EditorViewMode.preview,
    });
  const dragState = useDraggable(dragHandlers, note, moveNote, sendNoteToPreview);
  const { ref, handlers, isDragged, y } = dragState;
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

  return (
    <div key={`note-row-${note.id}`} className={'note-row-container w-full'}>
      <DragRowWrapper
        containerName={`note-row-backdrop ${name}`}
        dragRef={ref}
        isDragged={isDragged}
        handlers={handlers.drag}
        yOffset={y}
      >
        <NoteRowBody dragState={dragState} containerName={name} note={note} openEditor={openEditor} />
        <AddChildRow onSubmit={addChildSubmit} setCreateToggle={setCreateToggle} createToggle={createToggle} />
        {children}
      </DragRowWrapper>
    </div>
  );
};
