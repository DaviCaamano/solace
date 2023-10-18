import { EditorContent, Editor as TipTapEditor } from '@tiptap/react';
import { EditorHeader } from '@components/editor';
import { ContentWindow } from '@interface/Landing';

interface EditorProps {
  editor: TipTapEditor;
  setWindow: Setter<ContentWindow>;
}
export const TextEditor = ({ editor: tipTapEditor, setWindow }: EditorProps) => {
  return (
    <div id={'text-editor'} className={'flex flex-col md:flex-row justify-center items-center'}>
      <div
        className={'w-full rounded-2xl bg-mug'}
        style={{ height: `calc(100vh - ${heightReduction})` }}
      >
        <div className={'w-full h-full flex flex-col relative rounded-2xl'}>
          <EditorHeader setWindow={setWindow} />
          <EditorStyle />
          <EditorContent
            editor={tipTapEditor}
            data-testid={'text-editor'}
            className={'note-editor w-full flex-1 bg-mug text-latte rounded-b-2xl'}
          />
        </div>
      </div>
    </div>
  );
};

const EditorStyle = () => <style>{'.ProseMirror-focused { outline: none !important; }'}</style>;


const headerHeight = 80;
const footerHeight = 256;
const wordCountHeight = 64;
const additionalMargin = 32;

const heightReduction = (headerHeight + footerHeight + wordCountHeight + additionalMargin) / 16 + 'rem';
