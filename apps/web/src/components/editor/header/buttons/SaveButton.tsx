import SaveIcon from '@mui/icons-material/Save';
import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Tooltip } from '@components/shared';
import { CSSProperties, useCallback } from 'react';
import { useSaveKeybinding } from '../../menu/buttons/hooks';
import styles from '../../menu/buttons/editor-buttons.module.scss';
import { LoginRequired } from '@components/editor';

export const SaveButton = () => {
  const { editor, user, setEditor } = useEditor();
  const [save] = useUpdateNoteMutation();
  const stale = editor.stale;

  const saveNote = useCallback(() => {
    if (editor.id && user?.id) {
      save({ id: editor.id, title: editor.title, content: editor.content, userId: user.id })
        .then(() => setEditor({ stale: false }))
        .catch(() => setEditor({ stale: true }));
    }
  }, [editor.content, editor.id, editor.title, save, setEditor, user?.id]);

  const disabled = !user?.id;

  useSaveKeybinding(saveNote);
  return (
    <Tooltip
      name={'save-button-tooltip'}
      content={<ToolTipContent loggedIn={!!user?.id} stale={stale} />}
      {...tooltipStyle}
    >
      <LoginRequired isLoggedIn={!!user}>
        <SaveIcon
          className={`${styles.saveButton} ${disabled && styles.disabled} ${stale && styles.stale}`}
          onClick={saveNote}
          style={{ fontSize: '2rem' }}
        />
      </LoginRequired>
    </Tooltip>
  );
};

const ToolTipContent = ({ loggedIn, stale }: { loggedIn: boolean; stale: boolean | undefined }) =>
  !stale ? (
    'Saved!'
  ) : loggedIn ? (
    'Ctrl-S'
  ) : (
    <span>
      Please <span className={'underline'}>Login</span> to Save your note.
    </span>
  );

const tooltipStyle = {
  tooltip: { style: { maxWidth: '150px' } },
  wrapper: {
    className: 'w-8 h-8',
    style: {
      position: 'absolute',
      right: '0.5rem',
      top: '0.40625rem',
    } as CSSProperties,
  },
};
