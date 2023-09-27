import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { UserMenuLogoutButton } from '@components/header/button';
import { useOuterClicks } from '@hooks';
import { Ref } from 'react';

interface LoginPopupProps {
  open: boolean;
  setOpen: Setter<boolean>;
}
export const UserMenu = ({ open, setOpen }: LoginPopupProps) => {
  const clickRef = useOuterClicks(() => setOpen(false));
  return (
    <div id={'user-popup'} className={'absolute right-[1rem] top-[3rem] w-[9rem] flex justify-end'}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={'bg-mug border-tan border-2 rounded-[3px] overflow-hidden'}
            initial={'hidden'}
            animate={open ? 'shown' : 'hidden'}
            variants={containerAnimations}
            transition={{ duration: 0.2 }}
            exit={'hidden'}
            ref={clickRef as Ref<HTMLDivElement>}
          >
            <Link href={'/api/auth/logout'}>
              <AnimatePresence>
                {open && (
                  <motion.div
                    className={'bg-mug w-[9rem] py-1 transition duration-300 text-latte delay-200 '}
                    initial={'hidden'}
                    animate={open ? 'shown' : 'hidden'}
                    variants={contentAnimations}
                    transition={{ duration: 0.1, delay: 0.2 }}
                    exit={'hidden'}
                  >
                    <div className={'w-full'}>
                      <UserMenuLogoutButton />
                    </div>
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
    height: 'unset',
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
