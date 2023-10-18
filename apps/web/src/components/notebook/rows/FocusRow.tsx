import { useTipTap } from '@hooks/lib';
import { EditorContent } from '@tiptap/react';
import { Editor, EditorViewMode } from '@interface/editor';
import styles from '../notebook.module.scss';
import { ContentWindow } from '@interface/Landing';
import { CaretRight } from 'phosphor-react';
import { colors } from '@styles/tailwind';
import { TreeNote } from '#interfaces/notes';

interface FocusRowProps {
  editor: Editor;
  setWindow: Setter<ContentWindow>;
  rowDragged: TreeNote | undefined;
}
export const FocusRow = ({ editor: { title, viewMode }, rowDragged, setWindow }: FocusRowProps) => {
  if (!title || viewMode !== EditorViewMode.preview) {
    return null;
  }
  return (
    <div className={`focus-row ${styles.focusRow}`} onClick={() => setWindow(ContentWindow.editor)}>
      <NotePreview />
      <div className={`focus-row-title-box ${styles.focusRowTitleBox}`}>
        <div className={`focus-row-title ${styles.focusRowTitle}`}>{title}</div>
        <Caret rowDragged={rowDragged} />
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
          <EditorContent editor={tipTapEditor} data-testid={'text-editor'} className={editorClassNames} />
          <PreviewBlur />
        </div>
      </div>
    </div>
  );
};

const EditorStyle = () => <style>{'.ProseMirror-focused { outline: none !important; }'}</style>;
const editorClassNames = 'note-editor w-full flex-1 bg-mug text-latte';
const Caret = ({ rowDragged }: { rowDragged: TreeNote | undefined }) => (
  <div className={`absolute ${rowDragged && 'hidden'}`} style={{ right: 0, bottom: '0', transform: 'translateY(50%)' }}>
    <CaretRight size={32} color={colors.tan} weight='bold' />
  </div>
);

const PreviewBlur = () => (
  <div
    className={'preview-blur absolute pointer-events-none cursor-pointer h-full w-full'}
    style={{ background: `linear-gradient(transparent, 75%, ${colors.chalkboard})` }}
  />
);
