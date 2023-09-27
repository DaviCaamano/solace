import { PropsWithChildren, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';

export interface ModalProps extends PropsWithChildren {
  open: boolean;
  setOpen?: Setter<boolean>;
  onClose?: () => void;
}
export const Modal = ({ children, onClose, open, setOpen }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogIsOpen = dialogRef.current?.open;
  useEffect(() => {
    if (open && !dialogIsOpen) {
      dialogRef.current?.showModal();
    } else if (!open && dialogIsOpen) {
      dialogRef.current?.close();
    }
  }, [dialogIsOpen, open]);

  useEffect(() => {
    const closeListener = () => {
      onClose?.();
    };

    const ref = dialogRef.current;
    ref?.addEventListener('close', closeListener);

    return () => {
      ref?.removeEventListener('close', closeListener);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={`shared-modal ${styles.sharedModal} inline-block bg-latte rounded-xl relative scrollbar-none overflow-visible`}
    >
      {open && (
        <div id={'shared-modal-content'} className={`p-4 rounded-xl overscroll-x-none ${styles.modalContent}`}>
          {children}
          {setOpen && <Close setOpen={setOpen} />}
        </div>
      )}
    </dialog>
  );
};

interface CloseButtonProps {
  setOpen: Setter<boolean>;
}
const Close = ({ setOpen }: CloseButtonProps) => (
  <div
    className={'absolute bg-latte rounded-[2rem] flex justify-center items-center w-4 h-4 cursor-pointer'}
    style={{
      top: '10px',
      right: '10px',
    }}
    onClick={() => setOpen(false)}
  >
    <CloseIcon sx={{ fontSize: '1rem', fontWeight: '700' }} />
  </div>
);
