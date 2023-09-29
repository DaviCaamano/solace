import { EditorContent, Editor as TipTapEditor } from '@tiptap/react';
import { KeyboardEventHandler } from 'react';
interface EditorProps {
  editor: TipTapEditor;
}
export const TextEditor = ({ editor }: EditorProps) => {
  return (
    <>
      <style>{`
        .ProseMirror-focused {
          outline: none !important;
        }
      `}</style>
      <EditorContent
        editor={editor}
        className={'note-editor w-full h-full bg-latte text-coffee'}
        onKeyDown={tabBulletList(editor)}
      />
    </>
  );
};
type TabBulletListHandler = (editor: TipTapEditor) => KeyboardEventHandler<HTMLDivElement>;
const tabBulletList: TabBulletListHandler = (editor: TipTapEditor) => (event: React.KeyboardEvent<HTMLDivElement>) => {
  console.log('event', event.key);
  console.log('editor', editor);
  if (editor?.isFocused && event.key === 'tab') {
    event.preventDefault();
    editor.chain().focus().sinkListItem('listItem').run();
    console.log('event', event);
  }
};
