import { AnimatePresence, motion } from 'framer-motion';
import { SideBarHeader } from '@components/sidebar/SideBarHeader';
const { div: MotionDiv } = motion;
const sideBarAnimationStates = {
  closed: {
    x: '-18.75rem',
  },
  open: {
    x: 0,
  },
};

interface SideBarMenuProps {
  open: boolean;
  setOpen: Setter<boolean>;
}
export const SideBarPane = ({ open, setOpen }: SideBarMenuProps) => {
  return (
    <AnimatePresence>
      {open && (
        <MotionDiv
          id={'side-bar-menu-animator'}
          className={
            'h-full w-[18.75rem] bg-mug border-r-[10px] border-beige border-b-2 ease-out overflow-hidden'
          }
          initial={'closed'}
          animate={open ? 'open' : 'closed'}
          variants={sideBarAnimationStates}
          transition={{ duration: 0.3 }}
          exit={'closed'}
          style={{
            borderRightWidth: '3px',
            borderStyle: 'solid',
            borderImage:
              'linear-gradient(to bottom, rgba(254, 91, 99, 0.5), rgba(254, 91, 99, 0.05)) 2 100%',
          }}
        >
          <div className={'h-full w-[18.75rem]'}>
            <SideBarHeader />
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
