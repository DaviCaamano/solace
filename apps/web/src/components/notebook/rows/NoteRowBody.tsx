import {
  DraggedNotes,
  MoveNotePosition,
  NotebookDragEvents,
  TreeNote,
  UnsafeDeleteNoteTrigger,
} from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.css';
import { NoteRowTitle, RowButtons } from '@components/notebook';
import { motion } from 'framer-motion';
import { RowMoveZone } from '@components/notebook/move-row-zone/RowMoveZone';

const MotionDiv = motion.div;

type OpenEditor = (title: string, content: string, id?: string) => void;
interface RowProps {
  deleteNote: UnsafeDeleteNoteTrigger;
  dragHandlers: NotebookDragEvents;
  containerName: string;
  note: TreeNote;
  openEditor: OpenEditor;
  setCreateToggle: (flag: boolean) => void;
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
      <div className={`note-row-body ${styles.noteRowParent}`}>
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

        <NoteRowTitle
          animation={animation}
          beingDragged={beingDragged}
          containerName={containerName}
          note={note}
          hoveredOver={hoveredOver}
          moveType={moveType}
          sendNoteToEditor={sendNoteToEditor}
        >
          {note.title}
        </NoteRowTitle>
        {!beingDragged && (
          <RowButtons
            createChildToggle={() => {
              setCreateToggle(true);
            }}
            deleteNote={deleteNoteOnClick}
          />
        )}
      </div>
    </MotionDiv>
  );
};

const rowHeight = '2rem';
const expandedRowHeight = '3.8rem';
const animations = {
  expand: { height: expandedRowHeight },
  normal: { height: rowHeight },
  hidden: { height: rowHeight, opacity: 0.25 },
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
