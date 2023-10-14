import styles from '@components/notebook/notebook.module.scss';
import { ArrowLeft } from 'phosphor-react';
import { colors } from '@styles/tailwind';
import { Editor, EditorViewMode } from '@interface/editor';
import { TreeNote } from '#interfaces/notes';

interface BackButtonProps {
  noteList: TreeNote[] | undefined;
  show: boolean;
  selectedNote: TreeNote | undefined;
  setEditor: (editor: Partial<Editor>) => void;
}
export const HeaderBackButton = ({ noteList, show, selectedNote, setEditor }: BackButtonProps) => {
  const goBack = () => {
    if (noteList) {
      /** Selected Note is a root note */
      if (selectedNote?.parentId === null) {
        /** Unselect Note */
        return setEditor({
          id: undefined,
          content: undefined,
          title: undefined,
          stale: false,
          viewMode: EditorViewMode.preview,
        });
      }
      /** Not Root Note, so find the parent of the currently selected note and select it instead */
      const newParent = noteList.find(({ id }: TreeNote) => selectedNote?.parentId === id);
      if (newParent) {
        const { id, content, title } = newParent;
        setEditor({ id, content, title, stale: false, viewMode: EditorViewMode.preview });
      }
    }
  };

  return (
    <div className={`${styles.headerBack} ${show ? 'block' : 'hidden'}`}>
      <div className={styles.headerBackBackground} />
      <div className={styles.headerBackIconContainer}>
        <div className={styles.headerBackIconFramer} onClick={goBack}>
          <ArrowLeft
            size={44}
            color={colors.mug}
            weight={'bold'}
            style={{ zIndex: 1 }}
            className={styles.headerBackIcon}
          />
        </div>
      </div>
    </div>
  );
};
