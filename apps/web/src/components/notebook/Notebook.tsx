import { ContentWindow } from '@interface/Landing';
import styles from './notebook.module.scss';
import { AddNoteRow, FocusRow, NoteList } from '@components/notebook/rows';
import { useEditor, useListNotes } from '@hooks/context';
import { getNoteGeneration } from '@components/notebook/utils';
import { useMemo } from 'react';
import { useNotebook } from '@components/notebook/hooks';
import { EndOfTreeMoveZone } from '@components/notebook/move-row-zone';
import { DeleteNoteModal } from '@components/notebook/modal';
import { MoveNotePosition } from '#interfaces/notes';
import { NotebookHeader } from './header';

interface NotebookProps {
  window: ContentWindow;
  setWindow: Setter<ContentWindow>;
}

export const Notebook = ({ window, setWindow }: NotebookProps) => {
  const { setEditor, user, editor } = useEditor();
  const { isLoading, isError, error, data: noteList } = useListNotes(user);
  const [addNoteHandlers, deleteNoteHandler, openEditor, dragEvents] = useNotebook(
    window,
    noteList,
    setWindow,
    setEditor,
    user?.id,
  );

  const addNoteOnClick = (title: string) => addNoteHandlers.addNote({ userId: user?.id, title });

  const noteHeiarchy = useMemo(() => noteList && getNoteGeneration(editor.id, noteList), [editor.id, noteList]);
  if (!noteHeiarchy || isLoading) return <LoadingMessage />;
  if (isError) return <ErrorMessage error={error} />;
  return (
    <div id={'note-book'} className={styles.noteBook}>
      <DeleteNoteModal deleteNoteHandler={deleteNoteHandler} userId={user?.id} />
      <AddNoteRow addNoteHandlers={addNoteHandlers} onClick={addNoteOnClick} hide={!!dragEvents[0].rowDragged} />
      <EndOfTreeMoveZone dragEvents={dragEvents} position={MoveNotePosition.lastNote} />
      <NoteList
        addNoteHandlers={addNoteHandlers}
        dragHandlers={dragEvents}
        noteList={noteHeiarchy.list}
        openEditor={openEditor}
        userId={user?.id}
      />
      <FocusRow editor={editor} setWindow={setWindow} />
      <NotebookHeader
        deleteNoteHandler={deleteNoteHandler}
        dragEvents={dragEvents}
        selectedNote={noteHeiarchy.selectedNote}
        setEditor={setEditor}
        noteList={noteList}
      />
    </div>
  );
};

const LoadingMessage = () => <div className={'text-3xl text-latte font-semibold'}>Loading...</div>;
const ErrorMessage = ({ error }: { error: any }) => (
  <div className={'text-3xl text-latte font-semibold'}>{error?.message}</div>
);
