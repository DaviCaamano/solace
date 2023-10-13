import { Editor as TipTapEditor } from '@tiptap/react';
import {
  BlockButtonContainer,
  BoldButton,
  EditorHighlightColorButton,
  EditorTextColorButton,
  ItalicsButton,
  LinkButtonContainer,
  ListButtonContainer,
  LinkModal,
  ScriptButtonContainer,
  StrikeButton,
  UnderlineButton,
} from '@components/editor/menu';
import { ColorBoard } from '@interface/editor';
import { useState } from 'react';

interface EditorMenuProps {
  editor: TipTapEditor;
}
export const EditorMenu = ({ editor }: EditorMenuProps) => {
  const [colorBoard, setColorBoard] = useState<ColorBoard>(ColorBoard.none);
  const [linkModalOpen, setLinkModalOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');

  return (
    <div id={'editor-menu'} className={'flex flex-row h-8 w-full md:mb-2 relative'}>
      <BoldButton editor={editor} />
      <ItalicsButton editor={editor} />
      <UnderlineButton editor={editor} />
      <EditorTextColorButton editor={editor} open={colorBoard === ColorBoard.text} setOpen={setColorBoard} />
      <EditorHighlightColorButton editor={editor} open={colorBoard === ColorBoard.highlight} setOpen={setColorBoard} />
      <StrikeButton editor={editor} />

      <ScriptButtonContainer editor={editor} />
      <ListButtonContainer editor={editor} />
      <LinkButtonContainer editor={editor} setLink={setLink} setOpen={setLinkModalOpen} />
      <BlockButtonContainer editor={editor} />

      <LinkModal open={linkModalOpen} link={link} setLink={setLink} setOpen={setLinkModalOpen} editor={editor} />
    </div>
  );
};
