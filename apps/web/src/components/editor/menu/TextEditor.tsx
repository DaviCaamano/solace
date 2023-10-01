import { EditorContent, Editor as TipTapEditor } from '@tiptap/react';
interface EditorProps {
  editor: TipTapEditor;
}
export const TextEditor = ({ editor }: EditorProps) => {
  return (
    <div id={'add-note'} className={'flex flex-col md:flex-row justify-center items-center'}>
      <div className={`${editorDimensions} rounded-2xl bg-latte overflow-hidden w-full h-[100px]`}>
        <div className={'w-full h-full relative'}>
          <style>{`
        .ProseMirror-focused {
          outline: none !important;
        }
      `}</style>
          <EditorContent
            editor={editor}
            data-testid={'text-editor'}
            className={'note-editor w-full h-full bg-latte text-coffee'}
          />
        </div>
      </div>
    </div>
  );
};
const editorDimensions = 'w-[20rem] h-[20rem] sm:w-[31rem] sm:h-[31rem] lg:w-[46rem] lg:h-[46rem]';
