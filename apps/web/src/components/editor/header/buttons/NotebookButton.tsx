import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Tooltip } from '@components/shared';
import { CSSProperties, useCallback } from 'react';
import { colors } from '@styles/tailwind';
import styles from '../../menu/buttons/editor-buttons.module.scss';
import NotebookIcon from '@images/icons/notebook.svg';
import { ContentWindow } from '@interface/Landing';

interface NotebookButtonProps {
  setContentWindow: Setter<ContentWindow>;
}
export const NotebookButton = ({ setContentWindow }: NotebookButtonProps) => {
  const { editor, reset, user } = useEditor();
  const [save] = useUpdateNoteMutation();

  const onClick = useCallback(() => {
    if (editor.id && user?.id) {
      save({ id: editor.id, title: editor.title, content: editor.content, userId: user.id }).then(() => {
        reset();
        setContentWindow(ContentWindow.notebook);
      });
    }
  }, [editor.content, editor.id, editor.title, reset, save, setContentWindow, user?.id]);

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
