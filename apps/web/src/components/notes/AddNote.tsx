import { TextEditor } from '@components/notes';
import { Editor as TipTapEditor } from '@tiptap/react';
import { useTipTap } from '@hooks/lib/tiptap';
import { EditorMenu } from '@components/notes/EditorMenu';

export const AddNote = () => {
  const editor: TipTapEditor | null = useTipTap();

  if (!editor) {
    return null;
  }
  return (
    <div className={'flex flex-col'}>
      <EditorMenu editor={editor} />
      <div id={'add-note'} className={'flex flex-col md:flex-row justify-center items-center pb-[10%]'}>
        <div className={`${editorDimensions} rounded-2xl bg-latte overflow-hidden w-full h-[100px]`}>
          <div className={'w-full h-full relative'}>
            <TextEditor editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};

const editorDimensions = 'w-[20rem] h-[20rem] sm:w-[31rem] sm:h-[31rem] lg:w-[46rem] lg:h-[46rem]';
