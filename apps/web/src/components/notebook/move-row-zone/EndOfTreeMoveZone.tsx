import { RowMoveZone } from '@components/notebook/move-row-zone/RowMoveZone';
import { MoveNotePosition, TreeNote } from '#interfaces/notes';
import { useDraggable, UseDraggableState } from '@components/notebook/hooks';

interface EndOfTreeMoveZoneProps {
  dragEvents: UseDraggableState;
  position: MoveNotePosition;
}
export const EndOfTreeMoveZone = ({ dragEvents, position }: EndOfTreeMoveZoneProps) => {
  const { state: draggedState, handlers, isHovered } = useDraggable(dragEvents, rootNote);

  return (
    <div id={'last-child-move-zone'} {...handlers.row}>
      <RowMoveZone
        isHovered={isHovered}
        expand={!!draggedState.rowDragged}
        mouseHandlers={handlers.zone(MoveNotePosition.lastNote)}
        position={position}
      />
    </div>
  );
};

const rootNote: TreeNote = { id: 'ROOT_LAST' } as TreeNote;
