import { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';
import styles from './modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';

const animationSeconds = 0.3;
enum Fade {
  out,
  in,
}
interface EditorLinkModalProps extends PropsWithChildren {
  open: boolean;
  setOpen: Setter<boolean>;
  onClose?: () => void;
}
export const Modal = ({ children, onClose, open, setOpen }: EditorLinkModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [fade, setFade] = useState<Fade>(Fade.in);
  useLayoutEffect(() => {
    if (open && !dialogRef.current?.open) {
      setFade(Fade.in);
      dialogRef.current?.showModal();
    } else if (!open && dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, [open]);

  useLayoutEffect(() => {
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
      className={`shared-modal ${styles.sharedModal} ${
        fade === Fade.out && styles.fadeout
      } relative bg-latte rounded-xl p-4 w-fit overflow-visible`}
    >
      <div id={'shared-modal-content'} className={`w-full h-full ${styles.modalContent}`}>
        <button>close</button>
        {children}
        {setOpen && <Close setFade={setFade} setOpen={setOpen} />}
      </div>
    </dialog>
  );
};

interface CloseButtonProps {
  setFade: Setter<Fade>;
  setOpen: Setter<boolean>;
}
const Close = ({ setFade, setOpen }: CloseButtonProps) => (
  <div
    className={'absolute bg-latte rounded-[2rem] flex justify-center items-center w-6 h-6'}
    style={{
      top: '-20px',
      right: '-20px',
    }}
    onClick={() => {
      setFade(Fade.out);
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => setFade(Fade.in), 0);
      }, animationSeconds * 1000);
    }}
  >
    <CloseIcon sx={{ fontSize: '1rem', fontWeight: '700' }} />
  </div>
);
