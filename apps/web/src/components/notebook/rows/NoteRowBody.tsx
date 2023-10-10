import {
  DraggedNotes,
  DragMouseHandlers,
  MoveNotePosition,
  TreeNote,
  UnsafeDeleteNoteTrigger,
} from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.css';
import { RowButtons, rowTargetCss } from '@components/notebook';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { motion } from 'framer-motion';
import { RowMoveZone } from '@components/notebook/rows/RowMoveZone';
const MotionDiv = motion.div;

type OpenEditor = (title: string, content: string, id?: string) => void;
interface RowProps {
  deleteNote: UnsafeDeleteNoteTrigger;
  draggedState: DraggedNotes;
  depth: number;
  containerName: string;
  mouseHandlers: DragMouseHandlers;
  note: TreeNote;
  openEditor: OpenEditor;
  setCreateToggle: Setter<boolean>;
}
export const NoteRowBody = ({
  deleteNote,
  draggedState,
  depth,
  containerName,
  mouseHandlers: { row: rowHandlers, zone: zoneHandlers },
  note,
  openEditor,
  setCreateToggle,
}: RowProps) => {
  const { beingDragged, hoveredOver } = draggedState;

  const marginRight = 0.5 + depth + 'rem';
  const dragButton = `${containerName}-drag-button ${styles.dragIndicator}`;
  const isHoveredNote =
    !!beingDragged?.id && !!hoveredOver?.id && beingDragged?.id !== note.id && hoveredOver?.id === note.id;
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
      initial={'contract'}
      animate={isHoveredNote ? 'expand' : 'contract'}
      transition={{ duration: 0.3333 }}
      {...rowHandlers}
    >
      <div className={`note-row-parent ${styles.noteRowParent} ${rowTargetCss(beingDragged, note.id)}`}>
        <RowMoveZone
          draggedState={draggedState}
          expand={isHoveredNote}
          mouseHandlers={zoneHandlers(MoveNotePosition.aheadOf)}
          note={note}
          position={MoveNotePosition.aheadOf}
        />
        <div className={`row-body w-full h-8 flex flex-row ${isHoveredNote && 'pointer-events-none'}`}>
          <DragIndicatorIcon className={dragButton} style={{ marginRight, fontSize: '2rem' }} />
          <div
            className={'note-title flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis cursor-pointer'}
            style={{ height: rowHeight }}
            onClick={() => sendNoteToEditor()}
          >
            {note.title}
          </div>
          <RowButtons
            show={!beingDragged}
            createChildToggle={() => {
              setCreateToggle(true);
            }}
            deleteNote={deleteNoteOnClick}
          />
        </div>
        <RowMoveZone
          draggedState={draggedState}
          expand={isHoveredNote}
          mouseHandlers={zoneHandlers(MoveNotePosition.childOf)}
          note={note}
          position={MoveNotePosition.childOf}
        />
      </div>
    </MotionDiv>
  );
};

const rowHeight = '2rem';
const expandedRowHeight = '5.5rem';
const animations = {
  expand: {
    height: expandedRowHeight,
  },
  contract: {
    height: rowHeight,
  },
};
