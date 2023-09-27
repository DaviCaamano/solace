import { AnimatePresence, motion } from 'framer-motion';
import { editorColors } from '@constants/editor/editorColors';
const MotionDiv = motion.div;

interface PickerProps {
  open: boolean;
  setColor: (color: string) => void;
  positions: {
    xOpened: string;
    xClosed: string;
  };
}
export const EditorColorBoard = ({ open, setColor, positions: { xOpened, xClosed } }: PickerProps) => {
  const colors = Object.entries(editorColors).map(([name, color]: [string, string]) => (
    <ColorTile key={'editor-color-tile-' + name} name={name} color={color} onClick={() => setColor(color)} />
  ));

  const containerAnimations = {
    closed: {
      scale: 0,
      x: xClosed,
    },
    open: {
      scale: 1,
      x: 0,
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionDiv
          id={'color-board-animation'}
          className={'absolute'}
          initial={'closed'}
          animate={open ? 'open' : 'closed'}
          variants={containerAnimations}
          transition={{ duration: 0.3 }}
          exit={'closed'}
          style={{
            top: '-0.625rem',
            left: xOpened,
          }}
        >
          <div className={'relative w-full h-full '}>
            <div
              className={'z-10 absolute '}
              style={{
                bottom: 0,
                right: '-100%',
              }}
            >
              <div
                id={'color-picker'}
                className={'flex flex-row flex-wrap p-2 rounded-xl w-[11.25rem] bg-mug border-mug border'}
              >
                {colors}
              </div>
            </div>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

interface ColorProps {
  color: string;
  name: string;
  onClick: () => void;
}
const ColorTile = ({ color, name, onClick }: ColorProps) => (
  <button
    id={'color-picker-tile-' + name}
    className={'w-6 h-6 rounded-md border-white border-opacity-50 border m-1'}
    style={{ backgroundColor: color }}
    onClick={(event) => {
      event?.preventDefault();
      onClick();
    }}
  />
);
