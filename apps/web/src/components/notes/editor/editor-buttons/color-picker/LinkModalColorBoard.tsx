import { editorColors } from '@constants/editor/editorColors';
import { EditorColorTile } from '@components/notes';

interface LinkModalColorBoardProps {
  selectedColor: string | undefined;
  setColor: Setter<string | undefined>;
}
export const LinkModalColorBoard = ({ selectedColor, setColor }: LinkModalColorBoardProps) => {
  const colors = Object.entries(editorColors).map(([name, color]: [string, string]) => (
    <EditorColorTile
      key={'editor-color-tile-' + name}
      name={name}
      color={color}
      onClick={() => setColor(color)}
      className={selectedColor === color ? 'border-4 border-latte' : ''}
    />
  ));

  return (
    <div id={'link-modal-color-board'} className={'flex flex-row flex-wrap flex-1'}>
      {colors}
    </div>
  );
};
