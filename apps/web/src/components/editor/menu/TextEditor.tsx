import { EditorContent, Editor as TipTapEditor } from '@tiptap/react';
import { EditorHeader } from '@components/editor';
import { ContentWindow } from '@interface/Landing';

interface EditorProps {
  editor: TipTapEditor;
  setContentWindow: Setter<ContentWindow>;
}
export const TextEditor = ({ editor: tipTapEditor, setContentWindow }: EditorProps) => {
  return (
    <div id={'add-note'} className={'flex flex-col md:flex-row justify-center items-center'}>
      <div className={`${editorDimensions} rounded-2xl bg-latte w-full h-[100px]`}>
        <div className={'w-full h-full relative'}>
          <EditorHeader setContentWindow={setContentWindow} />
          <EditorStyle />
          <EditorContent
            editor={tipTapEditor}
            data-testid={'text-editor'}
            className={'note-editor w-full h-full bg-latte text-latte'}
          />
        </div>
      </div>
    </div>
  );
};
const editorDimensions = 'w-[20rem] h-[20rem] sm:w-[31rem] sm:h-[31rem] lg:w-[46rem] lg:h-[46rem]';

const EditorStyle = () => <style>{'.ProseMirror-focused { outline: none !important; }'}</style>;
