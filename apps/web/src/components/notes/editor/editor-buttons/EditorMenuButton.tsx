import { MouseEvent, MouseEventHandler, PropsWithChildren, useState } from 'react';

import styles from '@styles/editor/editor-buttons.module.scss';

const onCss = 'border-[2px] bg-opacity-20';
const pressedCss = 'border-[2px] bg-opacity-50';
const offCss = 'bg-opacity-0';

type UseButtonEvents = {
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onClick: () => void;
};

interface EditorMenuButtonTemplate extends PropsWithChildren {
  active?: boolean | undefined;
  className?: string;
  color?: string;
  onClick: () => void;
}
export const EditorMenuButton = ({ active, className, color, children, onClick }: EditorMenuButtonTemplate) => {
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
    onClick: onClick,
  };

  const css = pressed ? pressedCss : active ? onCss : offCss;
  return (
    <div
      className={
        'flex justify-center items-center w-8 mr-1 text-8 font-bold box-border ' +
        ` border-[1px] border-latte rounded-md text-latte bg-latte ${css} ${styles.noHighlight} ${className || ''}`
      }
      {...events}
      style={{
        color: color,
      }}
    >
      {children}
    </div>
  );
};
