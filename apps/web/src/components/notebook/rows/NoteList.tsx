import { NoteRow } from '@components/notebook/rows/NoteRow';
import { AddNoteHandlers, TreeNote } from '#interfaces/notes';
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

export const NoteList = ({ addNoteHandlers, depth = 0, dragHandlers, noteList, openEditor, userId }: NoteListProps) => {
  if (!noteList?.length) {
    return null;
  }

  return (
    <div className={'note-list flex flex-col'}>
      {noteList?.map((note, index) => {
        return (
          <NoteRow
            key={note.id}
            addNoteHandlers={addNoteHandlers}
            name={'note-row-' + index}
            note={note}
            depth={depth}
            dragHandlers={dragHandlers}
            openEditor={openEditor}
            userId={userId}
          />
        );
      })}
    </div>
  );
};
