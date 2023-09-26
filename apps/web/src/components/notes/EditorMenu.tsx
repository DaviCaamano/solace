import { Editor as TipTapEditor } from '@tiptap/react';
import { BoldButton, ItalicsButton, UnderlineButton } from '@components/notes';

interface EditorMenuProps {
  editor: TipTapEditor | null;
}
export const EditorMenu = ({ editor }: EditorMenuProps) => {
  return (
    <div className={'flex flex-row h-8 w-full md:mb-2'}>
      <BoldButton editor={editor} />
      <ItalicsButton editor={editor} />
      <UnderlineButton editor={editor} />
    </div>
  );
};
