import { Editor as TipTapEditor } from '@tiptap/react';
import {
  BoldButton,
  EditorHighlightColorButton,
  EditorTextColorButton,
  ItalicsButton,
  StrikeButton,
  SubScript,
  SuperScript,
  UnderlineButton,
} from '@components/notes';
import { ColorBoard } from '@interface/editor';
import { useState } from 'react';
import { Modal } from '@components/shared';

interface EditorMenuProps {
  editor: TipTapEditor;
}
export const EditorMenu = ({ editor }: EditorMenuProps) => {
  const [colorBoard, setColorBoard] = useState<ColorBoard>(ColorBoard.none);
  const [linkModalOpen, setLinkModalOpen] = useState<boolean>(true);
  return (
    <div className={'flex flex-row h-8 w-full md:mb-2 relative'}>
      <BoldButton editor={editor} />
      <ItalicsButton editor={editor} />
      <UnderlineButton editor={editor} />
      <EditorTextColorButton editor={editor} open={colorBoard === ColorBoard.text} setOpen={setColorBoard} />
      <EditorHighlightColorButton editor={editor} open={colorBoard === ColorBoard.highlight} setOpen={setColorBoard} />
      <StrikeButton editor={editor} />
      <SubScript editor={editor} />
      <SuperScript editor={editor} />
      <Modal open={linkModalOpen} setOpen={setLinkModalOpen} />
    </div>
  );
};
