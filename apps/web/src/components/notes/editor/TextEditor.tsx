import { EditorContent, Editor as TipTapEditor } from '@tiptap/react';
interface EditorProps {
  editor: TipTapEditor | null;
}
export const TextEditor = ({ editor }: EditorProps) => {
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
