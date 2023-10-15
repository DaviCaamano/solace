import { useTipTap } from '@hooks/lib';
import { EditorContent } from '@tiptap/react';
import { Editor, EditorViewMode } from '@interface/editor';
import styles from '../notebook.module.scss';
import { ContentWindow } from '@interface/Landing';
import { CaretRight } from 'phosphor-react';
import { colors } from '@styles/tailwind';

interface FocusRowProps {
  editor: Editor;
  setWindow: Setter<ContentWindow>;
}
export const FocusRow = ({ editor: { title, viewMode }, setWindow }: FocusRowProps) => {
  if (!title || viewMode !== EditorViewMode.preview) {
    return null;
  }
  return (
    <div className={`focus-row ${styles.focusRow}`} onClick={() => setWindow(ContentWindow.editor)}>
      <NotePreview />
      <div className={`focus-row-title ${styles.focusRowTitle}`}>
        {title} <Caret />
      </div>
    </div>
  );
};

const NotePreview = () => {
  const [tipTapEditor] = useTipTap(EditorViewMode.preview);

  return (
    <div className={`note-preview ${styles.preview}`}>
      <div className={'w-full h-full rounded-2xl bg-mug '}>
        <div className={`editor-preview-screen ${styles.previewEditor}`}>
          <EditorStyle />
          <EditorContent
            editor={tipTapEditor}
            data-testid={'text-editor'}
            className={'note-editor w-full flex-1 bg-mug text-latte '}
          />
        </div>
      </div>
    </div>
  );
};

const EditorStyle = () => <style>{'.ProseMirror-focused { outline: none !important; }'}</style>;

const Caret = () => (
  <div className={'absolute'} style={{ right: 0, bottom: '0', transform: 'translateY(50%)' }}>
    <CaretRight size={32} color={colors.tan} weight='bold' />
  </div>
);
