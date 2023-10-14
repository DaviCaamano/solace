import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Tooltip } from '@components/shared';
import { CSSProperties, useCallback } from 'react';
import { colors } from '@styles/tailwind';
import styles from '../../menu/buttons/editor-buttons.module.scss';
import NotebookIcon from '@images/icons/notebook.svg';
import { ContentWindow } from '@interface/Landing';
import { LocalStorage } from '@interface/cookie';
import add from 'date-fns/add';
import { useRouter } from 'next/router';

interface NotebookButtonProps {
  setWindow: Setter<ContentWindow>;
}
export const NotebookButton = ({ setWindow }: NotebookButtonProps) => {
  const router = useRouter();
  const { editor, reset, user } = useEditor();
  const [save] = useUpdateNoteMutation();

  /**
   * If user is not logged in, save the content of the editor to local storage.
   * This content will be used to create a new note for the user upon login with "Untitled" as the title.
   */
  const onClick = useCallback(() => {
    if (!user?.id) {
      localStorage.setItem(LocalStorage.editorContent, editor.content);
      localStorage.setItem(LocalStorage.expiration, add(new Date(), { days: 7 }).toString());
      router.push('/api/auth/login').then();
    } else if (editor.id) {
      save({ id: editor.id, title: editor.title, content: editor.content, userId: user.id }).then(() => {
        reset();
        console.log('~~~~', 1);
        setWindow(ContentWindow.notebook);
      });
    }
  }, [editor.content, editor.id, editor.title, reset, router, save, setWindow, user?.id]);

  return (
    <Tooltip name={'notebook-button-tooltip'} content={<ToolTipContent loggedIn={!!user?.id} />} {...tooltipStyle}>
      <NotebookIcon
        alt={'Click here to see your notebook, where all of your notes are saved.'}
        className={`${styles.notebookButton} `}
        onClick={onClick}
        color={colors.mug}
      />
    </Tooltip>
  );
};

const ToolTipContent = ({ loggedIn }: { loggedIn: boolean }) =>
  loggedIn ? (
    'View Notebook'
  ) : (
    <span>
      Please <span className={'underline'}>Login</span> to view your notebook.
    </span>
  );

const tooltipStyle = {
  tooltip: { style: { maxWidth: '150px' } },
  wrapper: {
    className: 'w-8 h-8',
    style: {
      position: 'absolute',
      right: '3rem',
      top: '8px',
    } as CSSProperties,
  },
};
