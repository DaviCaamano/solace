import { TextEditor } from '@components/notes';
import { Editor as TipTapEditor } from '@tiptap/react';
import { useTipTap } from '@hooks/lib/tiptap';
import { EditorMenu } from '@components/notes/EditorMenu';
import { WordCount } from '@components/notes/editor/WordCount';

export const AddNote = () => {
  const [editor, characterLimit] = useTipTap();

  if (!editor) {
    return null;
  }
  return (
    <div className={'flex flex-col-reverse'}>
      <WordCount editor={editor} characterLimit={characterLimit} />
      <Editor editor={editor} />
      <EditorMenu editor={editor} />
    </div>
  );
};

const editorDimensions = 'w-[20rem] h-[20rem] sm:w-[31rem] sm:h-[31rem] lg:w-[46rem] lg:h-[46rem]';
const Editor = ({ editor }: { editor: TipTapEditor }) => (
  <div id={'add-note'} className={'flex flex-col md:flex-row justify-center items-center'}>
    <div className={`${editorDimensions} rounded-2xl bg-latte overflow-hidden w-full h-[100px]`}>
      <div className={'w-full h-full relative'}>
        <TextEditor editor={editor} />
      </div>
    </div>
  </div>
);
