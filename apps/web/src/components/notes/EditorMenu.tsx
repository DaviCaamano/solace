import { BoldButton } from '@components/notes/editor/editor-buttons';
import { Editor as TipTapEditor } from '@tiptap/react';

interface EditorMenuProps {
  editor: TipTapEditor | null;
}
export const EditorMenu = ({ editor }: EditorMenuProps) => {
  return (
    <div className={'flex flex-row h-8 w-full md:mb-2'}>
      <BoldButton editor={editor} />
    </div>
  );
};
