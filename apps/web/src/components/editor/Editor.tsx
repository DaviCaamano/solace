import { useTipTap } from '@hooks/lib/tiptap';
import { EditorMenu } from '@components/editor/EditorMenu';
import { WordCount } from '@components/editor/menu/WordCount';
import { TextEditor } from './menu';

export const Editor = () => {
  const [editor, characterLimit] = useTipTap();

  if (!editor) {
    return null;
  }
  return (
    <div className={'flex flex-col-reverse'}>
      <WordCount editor={editor} characterLimit={characterLimit} />
      <TextEditor editor={editor} />
      <EditorMenu editor={editor} />
    </div>
  );
};
