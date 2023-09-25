import { EditorContent, Editor as TipTapEditor } from '@tiptap/react';
import colors from '@styles/tailwind/colors';
interface EditorProps {
  editor: TipTapEditor | null;
}
export const Editor = ({ editor }: EditorProps) => {
  return (
    <>
      <style>{`
        .ProseMirror-focused {
          outline: none !important;
        }
      `}</style>
      <EditorContent editor={editor} className={'note-editor w-full h-full bg-latte'} />
    </>
  );
};
