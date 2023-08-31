import { useEffect, useRef } from 'react';

export const useOuterClicks = (
  callback: () => void,
  onEscape: boolean = true,
) => {
  const ref = useRef<HTMLElement>(null);
  // Handle clicks outside of chat
  useEffect(() => {
    function handleClickOutside(event: any) {
      // if user clicks outside of ref, close the chat
      if (ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    }

    // Close chat if esc key is hit
    function handleEsc(e: any) {
      if (onEscape && e.keyCode === 27) {
        callback?.();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [callback, onEscape, ref]);

  return ref;
};
