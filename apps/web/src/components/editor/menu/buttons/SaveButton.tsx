import { EditorMenuButton } from '@components/editor';
import SaveIcon from '@mui/icons-material/Save';
import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Tooltip } from '@components/shared';
import { CSSProperties, useCallback } from 'react';
import { useSaveKeybinding } from './hooks';
import styles from './editor-buttons.module.scss';

export const SaveButton = () => {
  const { editor, user } = useEditor();
  const [save] = useUpdateNoteMutation();

  const onClick = useCallback(() => {
    if (editor.id && user?.id) {
      save({ id: editor.id, title: editor.title, content: editor.content, userId: user.id });
    }
  }, [editor.content, editor.id, editor.title, save, user?.id]);

  const disabled = !user?.id;

  useSaveKeybinding(onClick);
  return (
    <Tooltip name={'save-button-tooltip'} content={<ToolTipContent loggedIn={!!user?.id} />} {...tooltipStyle}>
      <EditorMenuButton
        id={'editor-save-button'}
        onClick={onClick}
        className={`${styles.saveButton} ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
      >
        <SaveIcon className={`h-[1rem] ${disabled ? 'text-brown' : 'text-mug'}`} />
      </EditorMenuButton>
    </Tooltip>
  );
};

const ToolTipContent = ({ loggedIn }: { loggedIn: boolean }) =>
  loggedIn ? (
    <span>Ctrl-S</span>
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
