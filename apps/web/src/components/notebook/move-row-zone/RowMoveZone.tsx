import { DraggedNotes, MoveNotePosition, TreeNote } from '#interfaces/notes';
import { colors } from '@styles/tailwind';
import { CSSProperties } from 'react';

export interface MoveZoneProps {
  draggedState: DraggedNotes;
  expand: boolean;
  mouseHandlers: { onMouseEnter: () => void };
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
  const hovered = zoneIsHovered(draggedState, note, position);
  return (
    <div
      className={'move-zone absolute transition-all w-full overflow-hidden px-[0.625rem]'}
      {...mouseHandlers}
      style={MoveZonePosition(expand, hovered, position)}
    ></div>
  );
};

const topBgColor = (hovered: boolean) => (hovered ? colors['mug-gray-off-light'] : colors['mug-gray-off']);
const bottomBgColor = (hovered: boolean) => (hovered ? colors['mug-gray-light'] : colors['mug-gray']);
const lastBgColor = (hovered: boolean) => (hovered ? colors['mug-gray-off-dark'] : colors['mug-gray-dark']);
/** CSS styles for Zone */
const MoveZonePosition = (expand: boolean, hovered: boolean, position: MoveNotePosition) => {
  switch (position) {
    case MoveNotePosition.aheadOf:
      return {
        top: '0.1rem',
        height: expand ? '1.8rem' : 0,
        backgroundColor: topBgColor(hovered),
      };
    case MoveNotePosition.childOf:
      return {
        bottom: '0.1rem',
        height: expand ? '1.8rem' : 0,
        backgroundColor: bottomBgColor(hovered),
      };
    case MoveNotePosition.lastNote: {
      const style: CSSProperties = {
        backgroundColor: lastBgColor(hovered),
      };
      if (expand) {
        style.flex = 1;
        style.minHeight = '3.6rem';
      }
      return style;
    }
  }

  const anchor = position === MoveNotePosition.aheadOf ? 'top' : 'bottom';
  const backgroundColor = position === MoveNotePosition.aheadOf ? topBgColor(hovered) : bottomBgColor(hovered);

  return {
    [anchor]: expand ? '0.1rem' : 0,
    height: expand ? '1.8rem' : 0,
    backgroundColor,
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