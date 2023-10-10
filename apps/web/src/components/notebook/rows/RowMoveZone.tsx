import { DraggedNotes, DragMouseHandlers, MoveNotePosition, TreeNote } from '#interfaces/notes';

interface MoveZoneProps {
  draggedState: DraggedNotes;
  expand: boolean;
  mouseHandlers: DragMouseHandlers;
  note: TreeNote;
  position: MoveNotePosition;
}

/**
 * When the user taps and drags a row, they can move that row over another row to reposition the row.
 * A row can be positioned either:
 *    1) In front of another row
 *    2) As a child of another row
 *    3) As the last of all rows (This option is handled elsewhere, not in this component)
 *
 *    When the user drags a row and hovers their mouse over another row, they may drop the row on top of these
 *    "RowMoveZone" components to trigger a request which changes the position of the dragged note.
 *
 *    This component will locate itself on the top half or bottom half of a row if the user drags another row on top
 *    of it.
 *    This component will locate itself on the top half if position is set to: MoveNotePosition.aheadOf
 *    This component will locate itself on the bottom half if position is set to: MoveNotePosition.childOf
 *
 * @param draggedState - State from the useDraggableRows hook.
 *    beingDragged: TreeNote | undefined - The row being dragged by the user
 *    hoveredOver: TreeNote | undefined - When the user is dragging a row, this indicates which row the user is
 *        hovering over.
 *    moveType: MoveNotePosition | undefined - When hoveredOver is true, this component will set the state of moveType
 *        onMouseEnter
 *        Sets state to [MoveNotePosition.aheadOf] if this component is positioned on the top half of the row.
 *        Sets state to [MoveNotePosition.childOf] if this component is positioned on the bottom half of the row.
 * @param expand - boolean: Whether this zone should show itself or not.
 * @param mouseHandlers - onMouseEnter and onMouseLeave mouse events to set the DraggedNotes state
 * @param note - TreeNote: The note this row represents
 * @param position - used to both set the position of this zone inside the row and the move request if the user
 *   drops a row on top of this zone.
 */
export const RowMoveZone = ({ draggedState, expand, mouseHandlers, note, position }: MoveZoneProps) => {
  const bgColor = zoneIsHovered(draggedState, note, position) ? 'bg-mug-disabled' : '';
  return (
    <div
      className={`move-zone  absolute transition-all  w-full opacity-50 ${bgColor}`}
      onDragEnd={() => console.log('Dropping on Position:', position)}
      {...mouseHandlers}
      style={MoveZonePosition(expand, position)}
    />
  );
};

/** CSS styles for Zone */
const MoveZonePosition = (expand: boolean, position: MoveNotePosition) => {
  const anchor = position === MoveNotePosition.aheadOf ? 'top' : 'bottom';
  const zIndex = position === MoveNotePosition.childOf ? 5 : 0;
  return {
    [anchor]: 0,
    zIndex,
    height: expand ? '2.5rem' : 0,
  };
};

/** Finds out if user is currently dragging a row over this zone. */
const zoneIsHovered = (
  { beingDragged, hoveredOver, moveType }: DraggedNotes,
  note: TreeNote,
  zoneMoveType: MoveNotePosition,
) => {
  const userIsDraggingARow = !!beingDragged?.id && !!hoveredOver?.id;
  const userIsNotDraggingThisRow = beingDragged?.id !== note.id;
  const userIsHoveringOverThisRow = hoveredOver?.id === note.id;
  const userIsHoveringOverThisZone = moveType === zoneMoveType;
  return userIsDraggingARow && userIsNotDraggingThisRow && userIsHoveringOverThisRow && userIsHoveringOverThisZone;
};
