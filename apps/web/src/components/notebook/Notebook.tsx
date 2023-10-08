import { ContentWindow } from '@interface/Landing';
import styles from './notebook.module.css';
import { AddNoteRow } from '@components/notebook/rows/AddNoteRow';
import { useEditorContext, useListNotes } from '@hooks/context';
import { useNotebook } from '@components/editor/hooks';
import { NoteList } from '@components/notebook/rows/NoteList';
import { getNoteHeiarchy } from '@components/notebook/utils';
import { useMemo } from 'react';

interface NotebookProps {
  setContentWindow: Setter<ContentWindow>;
}

export const Notebook = ({ setContentWindow }: NotebookProps) => {
  const { setEditor, user } = useEditorContext();
  const { isLoading, isError, error, data: noteList } = useListNotes(user);
  const [addNote, deleteNote, openEditor, dragEvents] = useNotebook(noteList, setContentWindow, setEditor);

  const addNoteOnClick = (title: string) => addNote({ userId: user?.id, title });

  const noteHeiarchy = useMemo(() => noteList && getNoteHeiarchy(noteList), [noteList]);

  if (!noteHeiarchy || isLoading) return <LoadingMessage />;
  if (isError) return <ErrorMessage error={error} />;
  return (
    <div id={'note-book'} className={styles.noteBook}>
      <Header />
      <NoteList
        noteList={noteHeiarchy}
        addNote={addNote}
        deleteNote={deleteNote}
        openEditor={openEditor}
        userId={user?.id}
        dragEvents={dragEvents}
      />
      <AddNoteRow onClick={addNoteOnClick} />
    </div>
  );
};

const LoadingMessage = () => <div className={'text-3xl text-latte font-semibold'}>Loading...</div>;
const ErrorMessage = ({ error }: { error: any }) => (
  <div className={'text-3xl text-latte font-semibold'}>{error?.message}</div>
);
const Header = () => <div id={'notebook-header'} className={`border-b-[2px] h-8 border-latte mb-2 ${styles.header}`} />;
