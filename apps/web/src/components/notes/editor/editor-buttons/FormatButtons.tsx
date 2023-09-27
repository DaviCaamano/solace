import { Editor as TipTapEditor } from '@tiptap/react';
import { EditorMenuButton } from '@components/notes';

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

export const StrikeButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      active={editor.isActive('strike')}
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={'font-medium relative px-1'}
    >
      S
      <div
        className={
          'absolute font-medium translate-x-[-50%]  font-green bg-latte w-[1.125rem] mt-[-0.0625rem] h-[0.0625rem] p-0'
        }
        style={{
          top: '50%',
          left: '50%',
        }}
      />
    </EditorMenuButton>
  );
};

export const SubScript = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      active={editor.isActive('subscript')}
      onClick={() => editor.chain().focus().toggleSubscript().run()}
      className={'font-medium relative px-1'}
    >
      X<sub>y</sub>
    </EditorMenuButton>
  );
};

export const SuperScript = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      active={editor.isActive('superscript')}
      onClick={() => editor.chain().focus().toggleSuperscript().run()}
      className={'font-medium relative px-1'}
    >
      X<sup>y</sup>
    </EditorMenuButton>
  );
};

interface LinkButtonProps extends EditorMenuButtonProps {
  setOpen: Setter<boolean>;
}
export const SuperScript = ({ editor }: ) => {
  return (
    <EditorMenuButton
      active={editor.isActive('superscript')}
      onClick={() => editor.chain().focus().toggleSuperscript().run()}
      className={'font-medium relative px-1'}
    >
      X<sup>y</sup>
    </EditorMenuButton>
  );
};
