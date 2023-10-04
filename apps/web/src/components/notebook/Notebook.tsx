import { ContentWindow } from '@interface/Landing';
import styles from './notebook.module.css';
import { AddNoteRow } from '@components/notebook/AddNoteRow';
import { useEditorContext, useListNotes } from '@hooks/context';
import { useNewNote } from '@components/editor/hooks';

interface NotebookProps {
  setContentWindow: Setter<ContentWindow>;
}

export const Notebook = ({ setContentWindow }: NotebookProps) => {
  const { setEditor, user } = useEditorContext();
  const { isLoading, isError, error, data: noteList } = useListNotes(user);
  const addNote = useNewNote(noteList, setContentWindow, setEditor);

  const addNoteOnClick = (title: string) => addNote({ userId: user?.id, title });

  if (isLoading) return <LoadingMessage />;
  if (isError) return <ErrorMessage error={error} />;
  return (
    <div id={'note-book'} className={styles.noteBook}>
      <Header />
      {/*{noteList?.map(({ title }) => <NoteRow addNote={() => {}}>{title}</NoteRow>)}*/}
      <AddNoteRow onClick={addNoteOnClick} />
    </div>
  );
};

const LoadingMessage = () => <div>Loading...</div>;
const ErrorMessage = ({ error }: { error: any }) => <div>{error?.message}</div>;
const Header = () => <div id={'notebook-header'} className={`border-b-[2px] h-8 border-latte mb-2 ${styles.header}`} />;
