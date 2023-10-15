import { MoveNotePosition, TreeNote } from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.scss';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { CaretRight } from 'phosphor-react';
import { capitalize } from '#utils/string';
import { colors } from '@styles/tailwind';
import { RowZoneIcon } from './RowZoneIcon';
import { CSSProperties } from 'react';

interface NoteRowTitleProps {
  rowDragged: TreeNote | undefined;
  containerName: string;
  hoveredOver: TreeNote | undefined;
  isDragged: boolean;
  isHovered: boolean;
  moveType: MoveNotePosition | undefined;
  note: TreeNote;
  title: string | undefined;
}
export const NoteRowTitle = ({
  rowDragged,
  containerName,
  hoveredOver,
  isDragged,
  isHovered,
  moveType,
  note: { id },
  title,
}: NoteRowTitleProps) => {
  const rowBeingDragged = rowDragged?.id === id;
  return (
    <div
      className={`row-body relative w-full flex flex-row ${hoveredOver && 'pointer-events-none'} `}
      style={{ height: '2rem' }}
    >
      <DragIcon hide={!!rowDragged || !!hoveredOver} containerName={containerName} />
      <div
        className={'row-body-framer absolute flex flex-row transition-all flex-1 left-[2rem]'}
        style={{ width: 'calc(100% - 2rem)' }}
      >
        <div
          className={
            'relative note-title w-full h-full flex flex-row justify-start items-center whitespace-nowrap ' +
            'overflow-ellipsis cursor-pointer text-latte transition-all '
          }
          style={{ height: '2rem' }}
        >
          <RowZoneIcon moveType={rowBeingDragged && moveType} />
          <Title isDragged={isDragged} isHovered={isHovered} moveType={moveType} title={title} />
          <div className={'flex-1'} />
          <CaretRight size={32} color={colors.tan} weight='bold' />
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

interface TitleProps {
  isDragged: boolean;
  isHovered: boolean;
  moveType: MoveNotePosition | undefined;
  title: string | undefined;
}
const Title = ({ isDragged, isHovered, moveType, title }: TitleProps) => {
  let shift: CSSProperties | undefined;
  if (isHovered) {
    if (moveType === MoveNotePosition.aheadOf) {
      shift = { transform: 'translateY(25%)' };
    } else if (moveType === MoveNotePosition.childOf) {
      shift = { transform: 'translateY(-25%)' };
    }
  } else if (isDragged && moveType === MoveNotePosition.childOf) {
    shift = { marginLeft: isDragged ? '24px' : undefined };
  }
  return (
    <div className={'row-title-text relative text-[1.75rem] transition-all'} style={shift}>
      {capitalize(title || 'Untitled')}
    </div>
  );
};
