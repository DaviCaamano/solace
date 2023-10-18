import { useLogin } from '@hooks/user';
import { useEffect, useRef } from 'react';
import { LocalStorage } from '@interface/cookie';
import { useAddNoteMutation } from '@context/redux/api/notes/notes.slice';
import { useEditor } from '@hooks/context';
import { Note } from '#interfaces/notes';
import { EditorViewMode } from '@interface/editor';

/** Handle Navigation Logic for Landing Page */
export const useUserNavigation = (): EditorViewMode => {
  const [addNote] = useAddNoteMutation();
  const { setEditor, editor } = useEditor();
  const { isLoading, isLoggedOut, user } = useLogin();

  const stickyLoggedStatus = useRef<boolean | undefined>(undefined);

  /** When the user goes from logged in to logged out, or vise versa, direct them to the appropriate content window. */
  useEffect(() => {
    if (!isLoading && stickyLoggedStatus.current !== isLoggedOut) {
      stickyLoggedStatus.current = isLoggedOut;
      if (isLoggedOut) {
        setEditor({ viewMode: EditorViewMode.editor });
      } else {
        /** Editor Content we store in Local Storage for logged-out users to resume editing upon logging in. */
        const locallyStoredContent = localStorage.getItem(LocalStorage.editorContent);

        /**
         * If content was stored in local storage && user has logged in:
         * Retrieve that content
         * Clear Local Storage
         * Create a new note with the title "Untitled"
         * Load the editor with this new Note.
         *
         */
        if (locallyStoredContent && user?.id) {
          addNote({ title: '', userId: user?.id, content: locallyStoredContent }).then(
            // @ts-ignore
            ({ data: newNote }: FetchResponse<Note | null>) => {
              if (newNote) {
                localStorage.clear();
                setEditor({ id: newNote.id, title: newNote.title, content: newNote.content, stale: false });
                setEditor({ viewMode: EditorViewMode.editor });
              } else {
                setEditor({ viewMode: EditorViewMode.notebook });
              }
            },
          );

          /** Typical login, user has not used the editor before logging in */
        } else {
          setEditor({ viewMode: EditorViewMode.notebook });
        }
      }
    }
  }, [addNote, isLoading, isLoggedOut, setEditor, user?.id]);

  return editor.viewMode;
};
