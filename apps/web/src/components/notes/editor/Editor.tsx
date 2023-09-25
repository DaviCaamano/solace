import { EditorContent, Editor as TipTapEditor } from '@tiptap/react';
import colors from '@styles/tailwind/colors';
interface EditorProps {
  editor: TipTapEditor | null;
}
export const Editor = ({ editor }: EditorProps) => {
  return (
    <>
      <style>{`
        .ProseMirror {
          minHeight: 100% !important;
          backgroundColor: red !important;
        }
        .ProseMirror-focused {
          outline: none !important;
        }
      `}</style>
      <EditorContent
        editor={editor}
        style={{
          backgroundImage:
            `linear-gradient(${colors['brown-dark']} .1em, transparent .1em), ` +
            `linear-gradient(90deg, transparent 28px, ${colors.mug} 28px, ${colors.mug} 30px, transparent 26px)`,
          backgroundSize: '100% 2rem',
          backgroundAttachment: 'local',
          backgroundColor: 'red',
          lineHeight: '2rem',
          fontSize: '1.5rem',
          minHeight: '100%',
        }}
        className={`w-full h-full bg-latte pl-8 pt-8 pr-4 pb-4 scrollbar-thin`}
      />
    </>
  );
};
