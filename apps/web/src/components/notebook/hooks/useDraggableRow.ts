import { DragEvent, useState } from 'react';
import { DraggedNotes, MoveNotePosition, NotebookDragEvents, TreeNote } from '#interfaces/notes';

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
  const [draggedState, setDraggedState] = useState<DraggedNotes>({
    beingDragged: undefined,
    hoveredOver: undefined,
    moveType: undefined,
  });

  const onDragStop = () => () => {
    // event.stopPropagation();
    setDragPos(initialDragPos);
    const hoveredOver = draggedState.hoveredOver;
    const movedTo = draggedState.moveType;
    //TODO implement move call here
    setDraggedState((prev: DraggedNotes) => ({
      ...prev,
      beingDragged: undefined,
      hoveredOver: undefined,
      moveTo: undefined,
    }));
  };
  const onDragStart = (note: TreeNote) => (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setDraggedState((prev: DraggedNotes) => ({
      ...prev,
      beingDragged: note,
    }));
  };

  const onMouseEnter = (hoveredOver: TreeNote, moveType: MoveNotePosition) => () => {
    if (draggedState) {
      setDraggedState((prev: DraggedNotes) => ({
        ...prev,
        hoveredOver,
        moveType,
      }));
    }
  };
  const onMouseLeave = (note: TreeNote) => () => {
    if (draggedState) {
      if (draggedState.hoveredOver?.id === note.id) {
        setDraggedState((prev: DraggedNotes) => ({
          ...prev,
          hoveredOver: undefined,
          moveType: undefined,
        }));
      }
    }
  };

  return (note: TreeNote) => ({
    dragHandlers: {
      onStart: onDragStart(note),
      onStop: onDragStop,
      position: dragPos,
    },
    mouseHandlers: (moveType: MoveNotePosition) => ({
      onMouseEnter: onMouseEnter(note, moveType),
      onMouseLeave: onMouseLeave(note),
    }),
    state: draggedState,
  });
};
