import {
  DraggedNotes,
  MoveNotePosition,
  NotebookDragEvents,
  TreeNote,
  UnsafeDeleteNoteTrigger,
} from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.css';
import { RowButtons } from '@components/notebook';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { motion } from 'framer-motion';
import { RowMoveZone } from '@components/notebook/rows/RowMoveZone';
import { PropsWithChildren } from 'react';
import NorthIcon from '@mui/icons-material/North';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const MotionDiv = motion.div;

type OpenEditor = (title: string, content: string, id?: string) => void;
interface RowProps {
  deleteNote: UnsafeDeleteNoteTrigger;
  dragHandlers: NotebookDragEvents;
  containerName: string;
  note: TreeNote;
  openEditor: OpenEditor;
  setCreateToggle: Setter<boolean>;
}
export const NoteRowBody = ({
  deleteNote,
  dragHandlers: { handlers, state: draggedState },
  containerName,
  note,
  openEditor,
  setCreateToggle,
}: RowProps) => {
  const { beingDragged, hoveredOver, moveType } = draggedState;
  const {
    mouseHandlers: { row: rowHandlers, zone: zoneHandlers },
  } = handlers(note);

  let [isHoveredNote, animation] = animationState({ beingDragged, draggedState, hoveredOver, note });

  //TODO IMPLEMENT DELETE WITH THIS
  const deleteNoteOnClick = () => {};
  const sendNoteToEditor = () => {
    openEditor(note.title, note.content, note.id);
  };

  return (
    <MotionDiv
      id={'note-row-body-animator'}
      className={'w-full flex justify-center'}
      variants={animations}
      initial={'normal'}
      animate={animation}
      transition={{ duration: 0.5 }}
      {...rowHandlers}
    >
      <MotionDiv
        className={`note-row-body ${styles.noteRowParent}`}
        variants={bodyAnimations}
        initial={'normal'}
        animate={animation}
        transition={{ duration: 0.5 }}
      >
        <RowMoveZone
          draggedState={draggedState}
          expand={isHoveredNote}
          mouseHandlers={zoneHandlers(MoveNotePosition.aheadOf)}
          note={note}
          position={MoveNotePosition.aheadOf}
        />
        <RowMoveZone
          draggedState={draggedState}
          expand={isHoveredNote}
          mouseHandlers={zoneHandlers(MoveNotePosition.childOf)}
          note={note}
          position={MoveNotePosition.childOf}
        />

        <Title
          animation={animation}
          beingDragged={beingDragged}
          containerName={containerName}
          note={note}
          hoveredOver={hoveredOver}
          moveType={moveType}
          sendNoteToEditor={sendNoteToEditor}
        >
          {note.title}
        </Title>
        {!beingDragged && (
          <RowButtons
            createChildToggle={() => {
              setCreateToggle(true);
            }}
            deleteNote={deleteNoteOnClick}
          />
        )}
      </MotionDiv>
    </MotionDiv>
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

interface TitleProps extends PropsWithChildren {
  animation: string;
  beingDragged: TreeNote | undefined;
  containerName: string;
  hoveredOver: TreeNote | undefined;
  note: TreeNote;
  sendNoteToEditor: () => void;
  moveType: MoveNotePosition | undefined;
}
const Title = ({
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
    default:
      return null;
  }
};

const rowHeight = '2rem';
const expandedRowHeight = '3.8rem';
const animations = {
  expand: { height: expandedRowHeight },
  normal: { height: rowHeight },
  hidden: { height: rowHeight, opacity: 0.25 },
};
const bodyAnimations = {
  expand: {},
  normal: {},
  hidden: {},
};

interface NoteRowBodyAnimationState {
  beingDragged: TreeNote | undefined;
  draggedState: DraggedNotes;
  hoveredOver: TreeNote | undefined;
  note: TreeNote;
}
const animationState = ({
  beingDragged,
  draggedState,
  hoveredOver,
  note,
}: NoteRowBodyAnimationState): [boolean, string] => {
  if (!beingDragged) {
    return [false, 'normal'];
  }

  const draggedId = beingDragged.id;
  const draggedDepth = beingDragged.depth;
  const noteDepth = note.depth;
  const hoverId = hoveredOver?.id;

  const draggedIsInLinage = draggedState.disabled.some((id: string) => id === note.id);
  const rowIsNotBeingDragged = draggedId !== note.id;
  const rowIsBeingHovered = !!hoverId && hoverId === note.id;

  const ancestorBeingDragged = draggedIsInLinage && draggedDepth < noteDepth;
  const isHoveredNote = !ancestorBeingDragged && rowIsBeingHovered && rowIsNotBeingDragged;

  let animation: string;
  if (ancestorBeingDragged) {
    animation = 'hidden';
  } else if (isHoveredNote) {
    animation = 'expand';
  } else {
    animation = 'normal';
  }
  return [isHoveredNote, animation];
};
