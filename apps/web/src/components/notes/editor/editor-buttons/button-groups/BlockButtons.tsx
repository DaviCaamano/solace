import { useState } from 'react';
import { EditorMenuButton } from '@components/notes';
import { motion } from 'framer-motion';
import { Editor as TipTapEditor } from '@tiptap/react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
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

export const ScriptButtonContainer = ({ editor }: EditorMenuButtonProps) => {
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
          <CodeBlockButton editor={editor} />
          <BlockQuoteButton editor={editor} />
        </div>
      </MotionDiv>
    </div>
  );
};

export const BlockQuoteButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <div
      id={'clear-link-button-container'}
      className={'font-medium absolute bottom-0 left-0 h-8 w-8 bg-brown p-0 rounded-md'}
    >
      <EditorMenuButton
        id={'editor-block-quote-button'}
        active={editor.isActive('blockquote')}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={'font-medium relative px-1 w-8 h-8'}
      >
        <FormatQuoteIcon className={'w-[1rem] h-[1rem]'} />
      </EditorMenuButton>
    </div>
  );
};

export const CodeBlockButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <div id={'code-block-button-container'} className={'font-medium relative h-8 w-8 bg-brown p-0 rounded-md'}>
      <EditorMenuButton
        id={'code-block-quote-button'}
        active={editor.isActive('codeBlock')}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={'font-medium relative px-1 h-8 w-8'}
      >
        <CodeIcon className={'w-[1rem] h-[1rem]'} />
      </EditorMenuButton>
    </div>
  );
};