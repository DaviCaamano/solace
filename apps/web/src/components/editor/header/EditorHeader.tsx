import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import styles from '@hooks/lib/tiptap/tip-tap.module.scss';
import { FocusEventHandler } from 'react';
import { ContentWindow } from '@interface/Landing';
import { NotebookButton, SaveButton } from '@components/editor/header/buttons';

interface EditorHeaderProps {
  setContentWindow: Setter<ContentWindow>;
}
export const EditorHeader = ({ setContentWindow }: EditorHeaderProps) => {
  const { editor, setTitle, user } = useEditor();
  const [save] = useUpdateNoteMutation();
  const onBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    const newTitle = event.currentTarget.innerHTML;
    setTitle(newTitle);
    if (editor.id && user?.id) {
      save({ id: editor.id, title: newTitle, content: editor.content, userId: user.id });
    }
  };
  return (
    <div id={'editor-header'} className={styles.header}>
      <div
        id={'editor-title'}
        className={styles.title}
        contentEditable
        onBlur={onBlur}
        placeholder={'Untitled'}
        suppressContentEditableWarning={true}
      >
        {editor?.title}
      </div>
      <NotebookButton setContentWindow={setContentWindow} />
      <SaveButton />
    </div>
  );
};
