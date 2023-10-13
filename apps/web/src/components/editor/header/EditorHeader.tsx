import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import styles from '@hooks/lib/tiptap/tip-tap.module.scss';
import { FocusEventHandler } from 'react';
import { ContentWindow } from '@interface/Landing';
import { NotebookButton, SaveButton } from '@components/editor/header/buttons';
import { User } from '#interfaces/user';
import { Editor } from '@interface/editor';
import { UpdateNoteDto } from '~note/dto/note.dto';

interface EditorHeaderProps {
  setContentWindow: Setter<ContentWindow>;
}
export const EditorHeader = ({ setContentWindow }: EditorHeaderProps) => {
  const { editor, setTitle, user } = useEditor();
  const [save] = useUpdateNoteMutation();

  return (
    <div id={'editor-header'} className={styles.header}>
      <div
        id={'editor-title'}
        className={styles.title}
        contentEditable={!!user}
        onBlur={onBlur(setTitle, editor, user, save)}
        placeholder={'Untitled'}
        suppressContentEditableWarning={true}
      >
        {user ? editor?.title : ''}
      </div>
      <NotebookButton setContentWindow={setContentWindow} />
      <SaveButton />
    </div>
  );
};

type SetTitle = (title: string) => void;
type SaveNote = (updateArgs: UpdateNoteDto) => Promise<any>;
const onBlur =
  (
    setTitle: SetTitle,
    editor: Editor,
    user: User | null | undefined,
    save: SaveNote,
  ): FocusEventHandler<HTMLDivElement> =>
  (event) => {
    const newTitle = event.currentTarget.innerHTML;
    setTitle(newTitle);
    if (editor.id && user?.id) {
      save({ id: editor.id, title: newTitle, content: editor.content, userId: user.id }).then();
    }
  };
