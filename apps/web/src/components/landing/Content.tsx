import { AnimatePresence, motion } from 'framer-motion';
import { NoteMenu } from '@components/landing';
import { ReactNode, useState } from 'react';
import { ContentWindow } from '@interface/Landing';
import { Editor } from '@components/editor';

const MotionDiv = motion.div;

enum Position {
  show = 'show',
  left = 'left',
  right = 'right',
  hideLeft = 'hideLeft',
  hideRight = 'hideRight',
}

export const Content = () => {
  const [window, setWindow] = useState<ContentWindow>(ContentWindow.menu);
  return (
    <div id={'content'} className={'relative w-full flex-1'}>
      <Slider
        open={window === ContentWindow.menu}
        position={{
          onLoad: Position.show,
          onExit: Position.left,
        }}
      >
        <NoteMenu setContentWindow={setWindow} />
      </Slider>
      <Slider
        open={window === ContentWindow.addNote}
        position={{
          onLoad: Position.hideRight,
          onExit: window === ContentWindow.menu ? Position.hideRight : Position.hideLeft,
        }}
      >
        <Editor />
      </Slider>
    </div>
  );
};

interface SliderPosition {
  onLoad: Position;
  onExit: Position;
}
interface SliderProps {
  open: boolean;
  children: ReactNode;
  position: SliderPosition;
}
const Slider = ({ children, open, position: { onLoad, onExit } }: SliderProps) => {
  return (
    <AnimatePresence>
      {open && (
        <MotionDiv
          className={'absolute'}
          initial={onLoad}
          animate={open ? Position.show : onExit}
          variants={animations}
          transition={{ duration: 0.5, delay: open ? 0 : 0.5 }}
          exit={onExit}
          style={{
            right: '50%',
            top: '50%',
          }}
        >
          <div
            className={'w-full h-full'}
            style={{
              transform: 'translate(50%, -50%)',
            }}
          >
            {children}
          </div>
        </MotionDiv>
      )}
      )
    </AnimatePresence>
  );
};

/** Animations for Content Windows */
const animations = {
  [Position.show]: {
    x: 0,
    opacity: 1,
  },
  [Position.hideLeft]: {
    x: '-100vw',
    opacity: 1,
  },
  [Position.hideRight]: {
    x: '+100vw',
    opacity: 1,
  },
  /** offscreen to the left */
  [Position.left]: {
    x: '-100vw',
    opacity: 0,
  },
  /** offscreen to the right */
  [Position.right]: {
    x: '+100vw',
    opacity: 0,
  },
};
