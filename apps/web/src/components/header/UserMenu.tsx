import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { UserMenuLogoutButton } from '@components/header/button';
import { useOuterClicks } from '@hooks/shared';
import { RefObject, Ref, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface UserMenuProps {
  loggedIn: boolean;
}
export const UserMenu = ({ loggedIn }: UserMenuProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const iconRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);
  const clickRef = useOuterClicks(
    () => {
      setOpen(false);
    },
    undefined,
    iconRef,
  );
  return (
    <div>
      <div id={'user-popup'} className={'absolute right-[1rem] top-[5rem] w-[9rem] flex justify-end'}>
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
      <UserIcon iconRef={iconRef} loggedIn={loggedIn} setOpen={setOpen} />
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

interface UserIconProps {
  iconRef: RefObject<HTMLAnchorElement>;
  loggedIn: boolean;
  setOpen: Setter<boolean>;
}
const UserIcon = ({ iconRef, loggedIn, setOpen }: UserIconProps) => (
  <a onClick={() => setOpen((prev: boolean) => !prev)} ref={iconRef}>
    <AccountCircleIcon
      className={`absolute right-5 text-xl text-latte fade_7 cursor-pointer w-12 h-12 ${!loggedIn && 'fadeOut'}`}
    />
  </a>
);
