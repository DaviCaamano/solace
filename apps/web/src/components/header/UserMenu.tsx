import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

interface LoginPopupProps {
  open: boolean;
}
export const UserMenu = ({ open }: LoginPopupProps) => {
  return (
    <div
      id={'user-popup'}
      className={
        'absolute right-[5rem] top-[5rem] h-[3.5rem] w-[9rem] flex justify-end'
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
            <Link href={'/api/auth/logout'}>
              <AnimatePresence>
                {open && (
                  <motion.div
                    className={
                      'bg-primary h-[3.5rem] w-[9rem] py-3 transition duration-300 ' +
                      'hover:bg-white delay-200 hover:delay-0'
                    }
                    initial={'hidden'}
                    animate={open ? 'shown' : 'hidden'}
                    variants={contentAnimations}
                    transition={{ duration: 0.1, delay: 0.2 }}
                    exit={'hidden'}
                  >
                    <Logout />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const containerAnimations = {
  shown: {
    height: '3.5rem',
    width: '9rem',
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

const Logout = () => {
  return (
    <div
      id={'logout-text'}
      className={'w-full flex justify-start align-center'}
    >
      <span
        className={'text-2xl text-[brown] text-center hover:underline w-full'}
      >
        Logout
      </span>
    </div>
  );
};
