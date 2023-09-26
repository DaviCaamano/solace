import { useToggle } from '@hooks';
import styles from '@styles/editor/editor-buttons.module.scss';
import { Editor as TipTapEditor } from '@tiptap/react';
import { FC, PropsWithChildren, useState } from 'react';
const onCss = 'border-[2px] bg-opacity-20';
const pressedCss = 'border-[2px] bg-opacity-50';
const offCss = 'bg-opacity-0';

type UseButtonEvents = {
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onClick: () => void;
};

interface EditorMenuButtonProps {
  editor: TipTapEditor | null;
}
interface EditorMenuButtonTemplate {
  active: boolean | undefined;
  onClick: () => void;
}
export const EditorMenuButton: FC<PropsWithChildren<EditorMenuButtonTemplate>> = ({ children, onClick, active }) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const events: UseButtonEvents = {
    onMouseDown: () => {
      setPressed(true);
    },
    onMouseUp: () => {
      setPressed(false);
    },
    onMouseLeave: () => {
      setPressed(false);
    },
    onClick,
  };

  const css = pressed ? pressedCss : active ? onCss : offCss;
  return (
    <div
      className={
        'flex justify-center items-center w-8 mr-1 text-8 font-bold ' +
        ` border-[1px] border-latte rounded-md text-latte bg-latte ${css} ${styles.noHighlight}`
      }
      {...events}
    >
      {children}
    </div>
  );
};

export const BoldButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton active={editor?.isActive('bold')} onClick={() => editor?.chain().toggleBold().focus().run()}>
      B
    </EditorMenuButton>
  );
};

export const ItalicsButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton active={editor?.isActive('italic')} onClick={() => editor?.chain().toggleItalic().focus().run()}>
      I
    </EditorMenuButton>
  );
};

export const UnderlineButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      active={editor?.isActive('underline')}
      onClick={() => editor?.chain().toggleUnderline().focus().run()}
    >
      U
    </EditorMenuButton>
  );
};
