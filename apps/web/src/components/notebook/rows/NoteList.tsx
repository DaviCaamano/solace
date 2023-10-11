import { NoteRow } from '@components/notebook/rows/NoteRow';
import { AddNoteHandlers, NotebookDragEvents, TreeNote } from '#interfaces/notes';
interface NoteListProps {
  addNoteHandlers: AddNoteHandlers;
  depth?: number;
  dragHandlers: NotebookDragEvents;
  markDelete: Setter<TreeNote | undefined>;
  noteList?: TreeNote[] | undefined;
  openEditor: (title: string, content: string, id?: string) => void;
  userId: string | undefined;
}

export const NoteList = ({
  addNoteHandlers,
  depth = 0,
  dragHandlers,
  markDelete,
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
          markDelete={markDelete}
          depth={depth}
          dragHandlers={dragHandlers}
          openEditor={openEditor}
          userId={userId}
        />
        <NoteList
          addNoteHandlers={addNoteHandlers}
          markDelete={markDelete}
          depth={depth + 1}
          dragHandlers={dragHandlers}
          noteList={note.children}
          openEditor={openEditor}
          userId={userId}
        />
      </div>
    );
  });
};
