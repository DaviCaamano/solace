import { RowMoveZone } from '@components/notebook/move-row-zone/RowMoveZone';
import { MoveNotePosition, NotebookDragEvents, TreeNote } from '#interfaces/notes';

interface EndOfTreeMoveZoneProps {
  dragEvents: NotebookDragEvents;
  position: MoveNotePosition;
}
export const EndOfTreeMoveZone = ({ dragEvents, position }: EndOfTreeMoveZoneProps) => {
  const lastNoteHandler = dragEvents.handlers(rootNote).mouseHandlers;

  return (
    <div id={'last-child-move-zone'} className={''} {...lastNoteHandler.row}>
      <RowMoveZone
        draggedState={dragEvents.state}
        expand={!!dragEvents.state.beingDragged}
        mouseHandlers={lastNoteHandler.zone(MoveNotePosition.lastNote)}
        note={rootNote}
        position={position}
      />
    </div>
  );
};

const rootNote: TreeNote = { id: 'ROOT' } as TreeNote;
