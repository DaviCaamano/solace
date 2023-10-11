import { ContentWindow } from '@interface/Landing';
import styles from './notebook.module.css';
import { AddNoteRow } from '@components/notebook/rows/AddNoteRow';
import { useEditorContext, useListNotes } from '@hooks/context';
import { NoteList } from '@components/notebook/rows/NoteList';
import { getNoteHeiarchy } from '@components/notebook/utils';
import { useMemo } from 'react';
import { useNotebook } from '@components/notebook/hooks';
import { MoveNotePosition } from '#interfaces/notes';
import { EndOfTreeMoveZone } from '@components/notebook/move-row-zone/EndOfTreeMoveZone';
import { DeleteNoteModal } from '@components/notebook/modal/DeleteNoteModal';

interface NotebookProps {
  setContentWindow: Setter<ContentWindow>;
}

export const Notebook = ({ setContentWindow }: NotebookProps) => {
  const { setEditor, user } = useEditorContext();
  const { isLoading, isError, error, data: noteList } = useListNotes(user);
  const [addNoteHandlers, deleteNoteHandler, openEditor, dragEvents] = useNotebook(
    noteList,
    setContentWindow,
    setEditor,
    user?.id,
  );

  const addNoteOnClick = (title: string) => addNoteHandlers.addNote({ userId: user?.id, title });

  const noteHeiarchy = useMemo(() => noteList && getNoteHeiarchy(noteList), [noteList]);

  console.log('noteHeiarchy', noteHeiarchy);
  if (!noteHeiarchy || isLoading) return <LoadingMessage />;
  if (isError) return <ErrorMessage error={error} />;
  return (
    <div id={'note-book'} className={styles.noteBook}>
      <Header />
      <NoteList
        addNoteHandlers={addNoteHandlers}
        markDelete={deleteNoteHandler.setMarkDelete}
        dragHandlers={dragEvents}
        noteList={noteHeiarchy}
        openEditor={openEditor}
        userId={user?.id}
      />
      <EndOfTreeMoveZone dragEvents={dragEvents} position={MoveNotePosition.lastNote} />
      <AddNoteRow addNoteHandlers={addNoteHandlers} onClick={addNoteOnClick} hide={!!dragEvents.state.beingDragged} />
      <DeleteNoteModal deleteNoteHandler={deleteNoteHandler} userId={user?.id} />
    </div>
  );
};

const LoadingMessage = () => <div className={'text-3xl text-latte font-semibold'}>Loading...</div>;
const ErrorMessage = ({ error }: { error: any }) => (
  <div className={'text-3xl text-latte font-semibold'}>{error?.message}</div>
);
const Header = () => <div id={'notebook-header'} className={`border-b-[2px] h-8 border-latte mb-2 ${styles.header}`} />;
