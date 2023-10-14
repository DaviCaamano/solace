import { useTipTap } from '@hooks/lib/tiptap';
import { EditorMenu } from '@components/editor/EditorMenu';
import { WordCount } from '@components/editor/menu/WordCount';
import { TextEditor } from './menu';
import { ContentWindow } from '@interface/Landing';

interface EditorProps {
  setWindow: Setter<ContentWindow>;
}
export const Editor = ({ setWindow }: EditorProps) => {
  const [editor, characterLimit] = useTipTap();

  if (!editor) {
    return null;
  }
  return (
    <div className={'flex flex-col-reverse'}>
      <WordCount editor={editor} characterLimit={characterLimit} />
      <TextEditor editor={editor} setWindow={setWindow} />
      <EditorMenu editor={editor} />
    </div>
  );
};
