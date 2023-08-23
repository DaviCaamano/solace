import PersonPinIcon from '@mui/icons-material/PersonPin';
import colors from '@styles/colors';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Login } from '@componentslogin/Login';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  console.log('open', open);

  return (
    <div
      id={'header'}
      className={'w-full h-20 flex flex-col items-end justify-start pt-3 pr-3'}
    >
      <LoginPopup open={open} />
      <div onClick={() => setOpen(!open)} className={'cursor-pointer'}>
        <PersonPinIcon style={{ fontSize: '3rem', color: colors.beige }} />
      </div>
    </div>
  );
};

interface LoginPopupProps {
  open: boolean;
}
const LoginPopup = ({ open }: LoginPopupProps) => {
  return (
    <div
      id={'login-popup'}
      className={
        'absolute right-[5rem] top-[5rem] h-[40rem] w-[40rem] flex justify-end'
      }
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className={
              'bg-beige border-tan border-2 rounded-2xl overflow-hidden'
            }
            initial={'hidden'}
            animate={open ? 'shown' : 'hidden'}
            variants={containerAnimations}
            transition={{ duration: 0.2 }}
            exit={'hidden'}
          >
            <AnimatePresence>
              {open && (
                <motion.div
                  className={'bg-primary h-[40rem] w-[40rem] p-5'}
                  initial={'hidden'}
                  animate={open ? 'shown' : 'hidden'}
                  variants={contentAnimations}
                  transition={{ duration: 0.1, delay: 0.2 }}
                  exit={'hidden'}
                >
                  <Login />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const containerAnimations = {
  shown: {
    height: '40rem',
    width: '40rem',
  },
  hidden: {
    height: 0,
    width: 0,
  },
};

const contentAnimations = {
  shown: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
