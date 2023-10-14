import styles from '@components/notebook/notebook.module.scss';
import Draggable from 'react-draggable';
import { DragRowHandlers, TreeNote } from '#interfaces/notes';
import { PropsWithChildren, useRef } from 'react';
interface DragRowWrapperProps extends PropsWithChildren {
  containerName: string;
  beingDragged: TreeNote | undefined;
  handlers: DragRowHandlers;
  note: TreeNote;
}
export const DragRowWrapper = ({ containerName, children, beingDragged, handlers, note }: DragRowWrapperProps) => {
  //Necessary to fix findDomNode deprecated error in react-draggable
  const nodeRef = useRef(null);
  return (
    <Draggable axis={'y'} {...handlers} nodeRef={nodeRef} handle={`.${containerName}-drag-button`}>
      <div
        className={`note-row relative ${containerName} ${styles.noteRow} ${rowTargetCss(beingDragged, note.id)}`}
        data-testid={containerName}
        ref={nodeRef}
      >
        {children}
      </div>
    </Draggable>
  );
};

export const rowTargetCss = (beingDragged: TreeNote | undefined, noteId: string | undefined) => {
  const isDragged = beingDragged?.id && beingDragged?.id === noteId;
  return isDragged ? 'bg-pink text-coffee font-semibold z-50 pointer-events-none opacity-50' : '';
};
