import { NoteRow } from '@components/notebook/rows/NoteRow';
import { AddNoteHandlers,  TreeNote } from '#interfaces/notes';
import { Editor } from '@interface/editor';
import { UseDraggableState } from '@components/notebook/hooks';
interface NoteListProps {
  addNoteHandlers: AddNoteHandlers;
  depth?: number;
  dragHandlers: UseDraggableState;
  noteList?: TreeNote[] | undefined;
  openEditor: (editor: Editor) => void;
  userId: string | undefined;
}

export const NoteList = ({
  addNoteHandlers,
  depth = 0,
  dragHandlers,
  noteList,
  openEditor,
  userId,
}: NoteListProps) => {
  if (!noteList?.length) {
    return null;
  }

  return noteList?.map((note, index) => {
    return (
      <div key={`note-row-${note.id}`} className={'note-row-container w-full'}>
        <NoteRow
          addNoteHandlers={addNoteHandlers}
          name={'note-row-' + index}
          note={note}
          depth={depth}
          dragHandlers={dragHandlers}
          openEditor={openEditor}
          userId={userId}
        />
      </div>
    );
  });
};
