import SaveIcon from '@mui/icons-material/Save';
import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Tooltip } from '@components/shared';
import { CSSProperties, useCallback } from 'react';
import { useSaveKeybinding } from './hooks';
import { colors } from '@styles/tailwind';

export const SaveButton = () => {
  const { editor, user, setEditor } = useEditor();
  const [save] = useUpdateNoteMutation();
  const stale = editor.stale;

  const onClick = useCallback(() => {
    if (editor.id && user?.id) {
      save({ id: editor.id, title: editor.title, content: editor.content, userId: user.id })
        .then(() => setEditor({ stale: false }))
        .catch(() => setEditor({ stale: true }));
    }
  }, [editor.content, editor.id, editor.title, save, setEditor, user?.id]);

  const disabled = !user?.id;

  useSaveKeybinding(onClick);
  return (
    <Tooltip
      name={'save-button-tooltip'}
      content={<ToolTipContent loggedIn={!!user?.id} stale={stale} />}
      {...tooltipStyle}
    >
      <SaveIcon style={{ fontSize: '2rem', color: getSaveIconColor(disabled, stale) }} />
    </Tooltip>
  );
};

const ToolTipContent = ({ loggedIn, stale }: { loggedIn: boolean; stale: boolean | undefined }) =>
  !stale ? (
    <span className={'text-[12px]'}>Saved!</span>
  ) : loggedIn ? (
    <span className={'text-[12px]'}>Ctrl-S</span>
  ) : (
    <span className={'text-[12px]'}>
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

const getSaveIconColor = (disabled?: boolean, stale?: boolean) =>
  !stale ? colors['mug-disabled-light'] : disabled ? colors['brown'] : colors['mug'];
