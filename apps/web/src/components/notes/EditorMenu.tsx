import { Editor as TipTapEditor } from '@tiptap/react';
import {
  BlockQuoteButton,
  BoldButton,
  BulletButton,
  EditorHighlightColorButton,
  EditorTextColorButton,
  ItalicsButton,
  LinkButtonContainer,
  StrikeButton,
  SubScriptButton,
  SuperScriptButton,
  UnderlineButton,
} from '@components/notes';
import { ColorBoard } from '@interface/editor';
import { useState } from 'react';
import { LinkModal } from '@components/notes/editor/LinkModal';

interface EditorMenuProps {
  editor: TipTapEditor;
}
export const EditorMenu = ({ editor }: EditorMenuProps) => {
  const [colorBoard, setColorBoard] = useState<ColorBoard>(ColorBoard.none);
  const [linkModalOpen, setLinkModalOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');

  return (
    <div className={'flex flex-row h-8 w-full md:mb-2 relative'}>
      <BoldButton editor={editor} />
      <ItalicsButton editor={editor} />
      <UnderlineButton editor={editor} />
      <EditorTextColorButton editor={editor} open={colorBoard === ColorBoard.text} setOpen={setColorBoard} />
      <EditorHighlightColorButton editor={editor} open={colorBoard === ColorBoard.highlight} setOpen={setColorBoard} />
      <StrikeButton editor={editor} />
      <SubScriptButton editor={editor} />
      <SuperScriptButton editor={editor} />
      <LinkButtonContainer editor={editor} setLink={setLink} setOpen={setLinkModalOpen} />
      <BlockQuoteButton editor={editor} />
      <BulletButton editor={editor} />
      <LinkModal open={linkModalOpen} link={link} setLink={setLink} setOpen={setLinkModalOpen} editor={editor} />
    </div>
  );
};
