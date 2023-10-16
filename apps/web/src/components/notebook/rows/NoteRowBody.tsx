import { MoveNotePosition, TreeNote, UseDraggableHandler } from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.scss';
import { RowMoveZone } from '@components/notebook/move-row-zone/RowMoveZone';
import { Editor } from '@interface/editor';
import { NoteRowTitle } from './NoteRowTitle';

type OpenEditor = (editor: Editor) => void;
interface RowProps {
  dragState: UseDraggableHandler;
  containerName: string;
  note: TreeNote;
  openEditor: OpenEditor;
}
export const NoteRowBody = ({ dragState, containerName, note }: RowProps) => {
  const {
    handlers: { zone: zoneHandlers, row: rowHandlers },
    isDragged,
    isHovered,
    state: { rowDragged, hoveredOver, moveType },
  } = dragState;
  return (
    <div
      id={'note-row-body-animator'}
      className={`w-full h-full flex justify-center border-b ${isDragged && 'border-t'} border-latte `}
      {...rowHandlers}
    >
      <div className={`note-row-body ${styles.noteRowParent}`}>
        <RowMoveZone
          isHovered={isHovered}
          expand={isHovered}
          mouseHandlers={zoneHandlers(MoveNotePosition.aheadOf)}
          position={MoveNotePosition.aheadOf}
        />
        <RowMoveZone
          isHovered={isHovered}
          expand={isHovered}
          mouseHandlers={zoneHandlers(MoveNotePosition.childOf)}
          position={MoveNotePosition.childOf}
        />

        <NoteRowTitle dragState={dragState} containerName={containerName} title={note.title} />
      </div>
    </div>
  );
};
