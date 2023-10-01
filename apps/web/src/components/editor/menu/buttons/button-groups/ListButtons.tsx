import { useState } from 'react';
import { EditorMenuButton } from '@components/editor';
import { motion } from 'framer-motion';
import { Editor as TipTapEditor } from '@tiptap/react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
const MotionDiv = motion.div;

const linkAnimations = {
  show: {
    height: '72px',
  },
  hide: {
    height: '32px',
  },
};

interface LinkButtonMouseover {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
interface EditorMenuButtonProps {
  editor: TipTapEditor;
}

export const ListButtonContainer = ({ editor }: EditorMenuButtonProps) => {
  const [mousedOver, setMousedOver] = useState<boolean>(false);

  const events: LinkButtonMouseover = {
    onMouseEnter: () => {
      setMousedOver(true);
    },
    onMouseLeave: () => {
      setMousedOver(false);
    },
  };
  return (
    <div className={'w-8 h-8 mr-1 relative'}>
      <MotionDiv
        className={'absolute w-8'}
        style={{ bottom: 0, left: 0 }}
        variants={linkAnimations}
        initial={'hide'}
        animate={mousedOver ? 'show' : 'hide'}
        transition={{ duration: 0.3333 }}
        {...events}
      >
        <div className={'relative w-full h-full rounded-md'}>
          <OrderedListButton editor={editor} />
          <BulletButton editor={editor} />
        </div>
      </MotionDiv>
    </div>
  );
};

export const BulletButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <div
      id={'bullet-button-container'}
      className={'font-medium absolute bottom-0 left-0 h-8 w-8 bg-brown p-0 rounded-md'}
    >
      <EditorMenuButton
        name={'bullet-list-button'}
        active={editor.isActive('bulletList')}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={'font-medium relative px-1 w-8 h-8'}
      >
        <FormatListBulletedIcon className={'w-8 h-8'} />
      </EditorMenuButton>
    </div>
  );
};

export const OrderedListButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <div id={'ordered-list-button-container'} className={'font-medium relative h-8 w-8 bg-brown p-0 rounded-md'}>
      <EditorMenuButton
        name={'ordered-list-button'}
        active={editor.isActive('orderedList')}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={'font-medium relative px-1 h-8 w-8'}
      >
        <FormatListNumberedIcon className={'w-[1rem] h-[1rem]'} />
      </EditorMenuButton>
    </div>
  );
};
