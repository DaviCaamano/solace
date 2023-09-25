import { useToggle } from '@hooks';
import styles from '@styles/editor/editor-buttons.module.scss';
import { Editor as TipTapEditor } from '@tiptap/react';
const onCss = 'border-[2px] bg-opacity-20';
const pressedCss = 'border-[2px] bg-opacity-50';
const offCss = 'bg-opacity-0';

interface BoldButtonProps {
  editor: TipTapEditor | null;
}
export const BoldButton = ({ editor }: BoldButtonProps) => {
  const { css, events } = useToggle({
    onCss,
    pressedCss,
    offCss,
    onToggle: (toggled: boolean) => {
      editor?.commands.setBold();
    },
  });

  return (
    <div
      className={
        'flex justify-center items-center w-8 text-8 font-bold ' +
        ` border-[1px] border-latte rounded-md text-latte bg-latte ${css} ${styles.noHighlight}`
      }
      {...events}
    >
      B
    </div>
  );
};
