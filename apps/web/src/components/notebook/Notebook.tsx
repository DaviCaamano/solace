import { ContentWindow } from '@interface/Landing';
import styles from './notebook.module.css';
import { AddNoteRow } from '@components/notebook/AddNoteRow';
import { useEditorContext, useListNotes } from '@hooks/context';
import { useAddNoteMutation } from '@context/redux/api/notes/notes.slice';

interface NotebookProps {
  setContentWindow: Setter<ContentWindow>;
}

export const Notebook = ({ setContentWindow }: NotebookProps) => {
  const { setEditor, user } = useEditorContext();
  const { isLoading: listIsLoading, isError: listHasError, error: listError, data: noteList } = useListNotes(user);
  const [addNote, { isError: newNoteHasError, isLoading: newNoteIsLoading, data: newNote, error: newNoteError }] =
    useAddNoteMutation();

  let resp;

  // @ts-ignore
  console.log('resp', resp);
  const addNoteOnClick = (title: string) => {
    console.log('~~~~~~~~~~~~~title', title, user);
    if (user?.id) {
      resp = addNote({ userId: user.id, title, content: '' });
    }
  };
  console.log({ listIsLoading, listHasError, listError, noteList });
  console.log({ newNoteIsLoading, newNoteHasError, newNoteError, newNote });
  if (listIsLoading) return <div>Loading...</div>;
  if (listHasError) return <ErrorMessage error={listError} />;
  return (
    <div id={'note-book'} className={NoteBookCss}>
      <Header />
      {/*{noteList?.map(({ title }) => <NoteRow addNote={() => {}}>{title}</NoteRow>)}*/}
      <AddNoteRow onClick={addNoteOnClick} />
    </div>
  );
};

const NoteBookCss =
  'w-[13.5rem] h-[13.5rem] sm:w-[21rem] sm:h-[21rem] lg:w-[31rem] lg:h-[31rem] ' +
  'relative overflow-hidden ' +
  'bg-mug ' +
  'rounded-2xl border-latte border-[2px]';

const ErrorMessage = ({ error }: { error: any }) => <div>{error?.message}</div>;
const Header = () => <div id={'notebook-header'} className={`border-b-[2px] h-8 border-latte mb-2 ${styles.header}`} />;

type SetEditor = (title: string, content: string) => void;
const startEditor = (setEditor: SetEditor, setContentWindow: Setter<ContentWindow>) => (title: string) => {
  setEditor(title, '');
  setContentWindow(ContentWindow.addNote);
};
