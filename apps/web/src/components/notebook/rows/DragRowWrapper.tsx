import styles from '@components/notebook/notebook.module.css';
import Draggable from 'react-draggable';
import { DragNoteHandlers, TreeNote } from '#interfaces/notes';
import { CSSProperties, PropsWithChildren, useRef } from 'react';
interface DragRowWrapperProps extends PropsWithChildren {
  containerName: string;
  descendants: string[];
  beingDragged: TreeNote | undefined;
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
}: DragRowWrapperProps) => {
  //Necessary to fix findDomNode deprecated error in react-draggable
  const nodeRef = useRef(null);
  return (
    <Draggable axis={'y'} {...handlers.dragHandlers} nodeRef={nodeRef} handle={`.${containerName}-drag-button`}>
      <div
        className={`note-row relative ${containerName} ${styles.noteRow} ${rowTargetCss(beingDragged, noteId)}`}
        data-testid={containerName}
        ref={nodeRef}
        style={zStyling(beingDragged, descendants)}
      >
        {children}
      </div>
    </Draggable>
  );
};

const zStyling = (beingDragged: TreeNote | undefined, descendants: string[] | undefined): CSSProperties => {
  const dragging = beingDragged?.id && descendants?.includes?.(beingDragged?.id);
  return {
    position: 'relative',
    zIndex: dragging ? 50 : 0,
    pointerEvents: dragging ? 'none' : 'all',
  };
};

export const rowTargetCss = (beingDragged: TreeNote | undefined, noteId: string | undefined) => {
  const isDragged = beingDragged?.id && beingDragged?.id === noteId;
  return isDragged ? 'bg-pink text-coffee font-semibold' : '';
};
