import { Editor as TipTapEditor } from '@tiptap/react';
import { EditorMenuButton } from './EditorMenuButton';

interface EditorMenuButtonProps {
  editor: TipTapEditor;
}

export const BoldButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      active={editor.isActive('bold')}
      onClick={() => editor.chain().toggleBold().focus().run()}
      className={'font-bold'}
    >
      B
    </EditorMenuButton>
  );
};

export const ItalicsButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      active={editor.isActive('italic')}
      onClick={() => editor.chain().toggleItalic().focus().run()}
      className={'italic'}
    >
      I
    </EditorMenuButton>
  );
};

export const UnderlineButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      active={editor.isActive('underline')}
      onClick={() => editor.chain().toggleUnderline().focus().run()}
      className={'underline'}
    >
      U
    </EditorMenuButton>
  );
};
