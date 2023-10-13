import { EditorMenuButton } from '@components/editor';
import SaveIcon from '@mui/icons-material/Save';
import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Tooltip } from '@components/shared';

export const SaveButton = () => {
  const { editor, user } = useEditor();
  const [save] = useUpdateNoteMutation();
  const disabled = !user?.id;
  const onClick = () => {
    if (editor.id && user?.id) {
      save({ id: editor.id, title: editor.title, content: editor.content, userId: user.id });
    }
  };
  return (
    <Tooltip
      content={<ToolTipContent />}
      tip={{ style: { maxWidth: '150px' } }}
      wrapper={{ className: 'w-8 h-8' }}
      open={disabled ? undefined : false}
    >
      <EditorMenuButton
        id={'editor-strike-button'}
        onClick={onClick}
        className={'font-medium relative px-1 w-8 h-8'}
        disabled={disabled}
      >
        <SaveIcon className={`h-[1rem] ${disabled ? 'text-brown' : 'text-latte'}`} />
      </EditorMenuButton>
    </Tooltip>
  );
};

const ToolTipContent = () => (
  <span>
    Please <span className={'underline'}>Login</span> to Save your note.
  </span>
);
