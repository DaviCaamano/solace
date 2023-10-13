import { AnimatePresence, motion } from 'framer-motion';
import { Notebook } from '@components/notebook';
import { ReactNode, useState } from 'react';
import { ContentWindow } from '@interface/Landing';
import { Editor } from '@components/editor';

const MotionDiv = motion.div;

export const Content = () => {
  const [window, setWindow] = useState<ContentWindow>(ContentWindow.notebook);
  return (
    <div id={'content'} className={'relative w-full flex-1'}>
      <AnimatePresence>
        <Slider key={'editor-notebook'} open={window === ContentWindow.notebook}>
          <Notebook setContentWindow={setWindow} />
        </Slider>
        <Slider key={'editor-content'} open={window === ContentWindow.editor}>
          <Editor setContentWindow={setWindow} />
        </Slider>
      </AnimatePresence>
    </div>
  );
};

/**
 * Slider Animates its children, so they slide onto the screen on load and slide off on exit.
 */

interface SliderProps {
  open: boolean;
  children: ReactNode;
  showOnload?: boolean;
}
const Slider = ({ children, open }: SliderProps) => {
  if (!open) {
    return null;
  }
  return (
    <MotionDiv
      className={'absolute'}
      initial={'hide'}
      animate={open ? 'show' : 'hide'}
      variants={animations}
      transition={{ duration: 0.3 }}
      exit={'hide'}
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
  );
};

/** Animations for Content Windows */
const animations = {
  hide: {
    y: '-0.5rem',
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};
