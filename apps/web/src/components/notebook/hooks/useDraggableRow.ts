import { DragEvent, useEffect, useState } from 'react';
import { DraggedNotes, MoveNotePosition, NewNoteToggle, NotebookDragEvents, TreeNote } from '#interfaces/notes';
import { useMoveNoteMutation } from '@context/redux/api/notes/notes.slice';

interface DragPos {
  x: number;
  y: number;
}
const initialDragPos = {
  x: 0,
  y: 0,
};

export const useDraggableRow = (
  userId: string | undefined,
  setNewNoteToggle: Setter<NewNoteToggle>,
): NotebookDragEvents => {
  const [dragPos, setDragPos] = useState<DragPos | undefined>();
  const [draggedState, setDraggedState] = useState<DraggedNotes>({
    beingDragged: undefined,
    hoveredOver: undefined,
    moveType: undefined,
    disabled: [],
  });
  const { beingDragged, moveType, hoveredOver } = draggedState;

  useEffect(() => {
    if (beingDragged) {
      const disabled: string[] = [];
      getAncestorsOfDragged(beingDragged, disabled);
      setDraggedState((prev: DraggedNotes) => ({
        ...prev,
        disabled,
      }));
    }
  }, [beingDragged]);

  const [moveNote] = useMoveNoteMutation();

  /**
   * react-draggable's on drop event handlers.
   * Triggers when the user picks up a row and drops it.
   * if the user drags a row over another row's movement zones,
   *    this handler will make a request to the backend to move the dragged row.
   * */
  const onDragStop = () => {
    setDragPos(initialDragPos);
    if (beingDragged && hoveredOver && moveType && userId) {
      moveNote({ id: beingDragged.id, position: moveType, targetId: hoveredOver.id, userId });
    }
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
    setNewNoteToggle(undefined);
  };

  const onZoneEnter = (hoveredOver: TreeNote, moveType: MoveNotePosition) => () => {
    if (draggedState) {
      setDraggedState((prev: DraggedNotes) => ({
        ...prev,
        moveType,
      }));
    }
  };

  const onMouseEnter = (hoveredOver: TreeNote) => () => {
    if (beingDragged) {
      setDraggedState((prev: DraggedNotes) => ({
        ...prev,
        hoveredOver,
      }));
    }
  };

  const onMouseLeave = (note: TreeNote) => () => {
    if (beingDragged) {
      if (draggedState.hoveredOver?.id === note.id) {
        setDraggedState((prev: DraggedNotes) => ({
          ...prev,
          hoveredOver: undefined,
          moveType: undefined,
        }));
      }
    }
  };

  return {
    handlers: (note: TreeNote) => ({
      dragHandlers: {
        onStart: onDragStart(note),
        onStop: onDragStop,
        position: dragPos,
      },
      mouseHandlers: {
        row: {
          onMouseEnter: onMouseEnter(note),
          onMouseLeave: onMouseLeave(note),
        },
        zone: (moveType: MoveNotePosition) => ({
          onMouseEnter: onZoneEnter(note, moveType),
        }),
      },
    }),
    state: draggedState,
  };
};

const getAncestorsOfDragged = (node: TreeNote, list: string[]) => {
  list.push(node.id);
  node?.children?.forEach((note: TreeNote) => {
    getAncestorsOfDragged(note, list);
  });
};
