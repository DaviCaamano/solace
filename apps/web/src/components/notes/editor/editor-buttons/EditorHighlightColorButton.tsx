import { Editor as TipTapEditor } from '@tiptap/react';
import colors from '@styles/tailwind/colors';
import { EditorColorBoard, EditorMenuButton } from '@components/notes';
import { editorColors } from '@constants/editor/editorColors';
import { ColorBoard } from '@interface/editor';
import HighLightIcon from '@images/icons/highlight-text.svg';

const defaultColor = colors.latte;
interface EditorMenuButtonProps {
  editor: TipTapEditor;
  open: boolean;
  setOpen: Setter<ColorBoard>;
}
export const EditorHighlightColorButton = ({ editor, open, setOpen }: EditorMenuButtonProps) => {
  const selectedColor = getColor(editor);

  return (
    <div id={'color-picker'} className={'relative '}>
      <EditorMenuButton
        onClick={() => setOpen(open ? ColorBoard.none : ColorBoard.highlight)}
        className={'font-bold flex flex-col bg-latte bg-opacity-5 h-full'}
        color={selectedColor}
      >
        <Icon selectedColor={selectedColor} />
        <EditorColorBoard
          open={open}
          setColor={(color: string) => editor.chain().focus().toggleHighlight({ color }).run()}
          positions={{
            xOpened: '35px',
            xClosed: '-17px',
          }}
        />
      </EditorMenuButton>
    </div>
  );
};

const Icon = ({ selectedColor }: { selectedColor?: string }) => {
  return (
    <HighLightIcon
      alt={'Click here to highlight text background.'}
      color={selectedColor}
      width={'18px'}
      className={'w-[18px] h-[18px]'}
    />
  );
};

const getColor = (editor: TipTapEditor) => {
  if (!editor.isActive('highlight')) {
    return defaultColor;
  }
  for (let key in editorColors) {
    if (editor.isActive('highlight', { color: editorColors[key] })) {
      return editorColors[key];
    }
  }
  return defaultColor;
};
