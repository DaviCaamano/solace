import { PropsWithChildren } from 'react';
import { MoveNotePosition, TreeNote } from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.css';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
const rowHeight = '2rem';
const expandedRowHeight = '3.8rem';

interface TitleProps extends PropsWithChildren {
  animation: string;
  beingDragged: TreeNote | undefined;
  containerName: string;
  hoveredOver: TreeNote | undefined;
  note: TreeNote;
  sendNoteToEditor: () => void;
  moveType: MoveNotePosition | undefined;
}
export const NoteRowTitle = ({
  animation,
  beingDragged,
  containerName,
  children,
  hoveredOver,
  moveType,
  note: { id, depth },
  sendNoteToEditor,
}: TitleProps) => {
  const topPosition = moveType === MoveNotePosition.aheadOf;
  const bottomPosition = moveType === MoveNotePosition.childOf;
  const rowBeingDragged = beingDragged?.id === id;
  const additionalMargin = rowBeingDragged && bottomPosition ? 1.25 : 0;
  const left = 1.75 + additionalMargin + (rowBeingDragged ? hoveredOver?.depth || depth : depth) + 'rem';
  const height = animation === 'expand' ? expandedRowHeight : rowHeight;
  return (
    <div
      className={`row-body relative w-full flex flex-row ${hoveredOver && 'pointer-events-none'}`}
      style={{ height }}
    >
      <DragIcon hide={!!beingDragged || !!hoveredOver} containerName={containerName} />
      <div
        className={'row-body-framer absolute flex flex-row transition-all'}
        style={{
          left,
          ...framerStyle(rowBeingDragged, hoveredOver, topPosition),
        }}
      >
        <div
          className={
            'relative note-title w-full h-full flex justify-start items-center whitespace-nowrap ' +
            'overflow-ellipsis cursor-pointer text-latte transition-all'
          }
          style={{ height: rowHeight }}
          onClick={sendNoteToEditor}
        >
          <TextDragIcon moveType={rowBeingDragged && moveType} />
          {children}
        </div>
      </div>
    </div>
  );
};

interface DragIconProps {
  hide: boolean;
  containerName: string;
}
const DragIcon = ({ hide, containerName }: DragIconProps) => {
  const dragButton = `${containerName}-drag-button ${hide && styles.hideDragButton} ${styles.dragIndicator}`;

  return <DragIndicatorIcon className={dragButton} style={{ fontSize: '2rem' }} />;
};

const topFramerStyle = {
  top: 0,
};
const bottomFramerStyle = {
  top: '50%',
  transform: 'translateY(-50%)',
};
const framerStyle = (rowBeingDragged: boolean, hoveredOver: TreeNote | undefined, topPosition: boolean) => {
  if (rowBeingDragged || (hoveredOver && !topPosition)) {
    return topFramerStyle;
  }
  return bottomFramerStyle;
};
interface ZoneIconProps {
  moveType: MoveNotePosition | boolean | undefined;
}
const TextDragIcon = ({ moveType }: ZoneIconProps) => {
  switch (moveType) {
    case MoveNotePosition.aheadOf:
      return (
        <div className={'title-icon-container absolute h-full flex justify-center items-center right-full w-3 pr-2'}>
          <NorthIcon className={'relative text-latte-lighter'} style={{ fontSize: '1.25rem', lineHeight: '100%' }} />
        </div>
      );
    case MoveNotePosition.childOf:
      return (
        <div className={'title-icon-container absolute h-full flex justify-center items-center right-full w-3 pr-2'}>
          <SubdirectoryArrowRightIcon
            className={'relative text-latte-lighter'}
            style={{ fontSize: '1.25rem', lineHeight: '100%' }}
          />
        </div>
      );
    case MoveNotePosition.lastNote:
      return (
        <div className={'title-icon-container absolute h-full flex justify-center items-center right-full w-3 pr-2'}>
          <NorthIcon
            className={'relative text-latte-lighter'}
            style={{ fontSize: '1.25rem', lineHeight: '100%', transform: 'scaleY(-1)' }}
          />
        </div>
      );
    default:
      return null;
  }
};
