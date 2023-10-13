import { ContentWindow } from '@interface/Landing';
import { useLogin } from '@hooks/user';
import { useEffect, useRef, useState } from 'react';

/** Handle Navigation Logic for Landing Page */
export const useUserNavigation = (): [ContentWindow, Setter<ContentWindow>] => {
  const [window, setWindow] = useState<ContentWindow>(ContentWindow.notebook);

  const { isLoading, isLoggedOut } = useLogin();
  const stickyLoggedStatus = useRef<boolean | undefined>(undefined);

  /** When the user goes from logged in to logged out, or vise versa, direct them to the appropriate content window. */
  useEffect(() => {
    if (!isLoading && stickyLoggedStatus.current !== isLoggedOut) {
      stickyLoggedStatus.current = isLoggedOut;
      if (isLoggedOut) {
        setWindow(ContentWindow.editor);
      } else {
        setWindow(ContentWindow.notebook);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedOut]);

  return [window, setWindow];
};
