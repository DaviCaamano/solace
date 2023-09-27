import { setContent } from '@context/redux';
import { LocalStorage } from '@interface/cookie';
import { add } from 'date-fns';

let updatedContentTimeStamp: Date = new Date();

/** Save Contents of Editor every 30 seconds */
const timeStampExpired = (seconds: number): boolean => {
  const expiredStamp = add(updatedContentTimeStamp, { seconds });
  if (Date.now() > expiredStamp.getTime()) {
    updatedContentTimeStamp = new Date();
    return true;
  }

  return false;
};

export const saveEditToCookieMiddleware = (store) => (next) => (action) => {
  if (action.type === setContent.type) {
    const content = action.payload;
    if (content && timeStampExpired(30)) {
      localStorage.setItem(LocalStorage.editorContent, action.payload);
      localStorage.setItem(LocalStorage.expiration, add(new Date(), { days: 7 }).toString());
    }
  }

  next(action);
};
