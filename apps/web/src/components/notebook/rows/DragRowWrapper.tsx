import styles from '@components/notebook/notebook.module.css';
import Draggable from 'react-draggable';
import { DragNoteHandlers } from '#interfaces/notes';
import { CSSProperties, PropsWithChildren, useRef } from 'react';
interface DragRowWrapperProps extends PropsWithChildren {
  containerName: string;
  descendants: string[];
  beingDragged: string | undefined;
  dropTarget: string | undefined;
  handlers: DragNoteHandlers;
  noteId: string | undefined;
}
export const DragRowWrapper = ({
  containerName,
  children,
  descendants,
  beingDragged,
  handlers,
  noteId,
  dropTarget,
}: DragRowWrapperProps) => {
  //Necessary to fix findDomNode deprecated error in react-draggable
  const nodeRef = useRef(null);
  return (
    <Draggable axis={'y'} {...handlers.dragHandlers} nodeRef={nodeRef} handle={`.${containerName}-drag-button`}>
      <div
        className={`note-row relative ${containerName} ${styles.noteRow} ${rowTargetCss(
          beingDragged,
          dropTarget,
          noteId,
        )}`}
        data-testid={containerName}
        ref={nodeRef}
        {...handlers.dropHandlers}
        style={zStyling(beingDragged, descendants)}
      >
        {children}
      </div>
    </Draggable>
  );
};

const zStyling = (beingDragged: string | undefined, descendants: string[] | undefined): CSSProperties => {
  const dragging = beingDragged && descendants?.includes?.(beingDragged);
  return {
    position: 'relative',
    zIndex: dragging ? 50 : 0,
    pointerEvents: dragging ? 'none' : 'all',
  };
};

export const rowTargetCss = (
  beingDragged: string | undefined,
  dropTarget: string | undefined,
  noteId: string | undefined,
) => {
  const isDragged = beingDragged === noteId;
  const isTarget = !!beingDragged && dropTarget === noteId;

  return isDragged ? 'bg-pink text-coffee font-semibold' : isTarget ? 'bg-mug-disabled' : '';
};
