import { DragEvent, useRef, useState } from 'react';
import { DraggedNotes, NotebookDragEvents } from '#interfaces/notes';

interface DragPos {
  x: number;
  y: number;
}
const initialDragPos = {
  x: 0,
  y: 0,
};

export const useDraggableRow = (): NotebookDragEvents => {
  const [dragPos, setDragPos] = useState<DragPos | undefined>();
  const [dragged, setDragged] = useState<DraggedNotes>({ beingDragged: undefined, dropTarget: undefined });

  const onDragStop = (noteId: string) => (event: DragEvent<HTMLDivElement>) => {
    // event.stopPropagation();
    setDragPos(initialDragPos);
    setDragged((prev: DraggedNotes) => ({
      ...prev,
      beingDragged: undefined,
    }));
    //Move Request Here
  };
  const onDragStart = (noteId: string) => (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setDragged((prev: DraggedNotes) => ({
      ...prev,
      beingDragged: noteId,
    }));
  };

  const onMouseEnter = (noteId: string) => (event: DragEvent<HTMLDivElement>) => {
    if (dragged) {
      setDragged((prev: DraggedNotes) => ({
        ...prev,
        dropTarget: noteId,
      }));
    }
  };
  const onMouseLeave = (noteId: string) => (event: DragEvent<HTMLDivElement>) => {
    if (dragged) {
      if (dragged.dropTarget === noteId) {
        setDragged((prev: DraggedNotes) => ({
          ...prev,
          dropTarget: undefined,
        }));
      }
    }
  };

  return (noteId: string) => ({
    dragHandlers: {
      onStart: onDragStart(noteId),
      onStop: onDragStop(noteId),
      position: dragPos,
    },
    dropHandlers: {
      onMouseEnter: onMouseEnter(noteId),
      onMouseLeave: onMouseLeave(noteId),
    },
    active: dragged,
  });
};
