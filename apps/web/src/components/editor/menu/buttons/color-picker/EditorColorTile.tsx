interface ColorProps {
  color: string;
  name: string;
  onClick: () => void;
  className?: string;
}
export const EditorColorTile = ({ className, color, name, onClick }: ColorProps) => (
  <div
    id={'color-picker-tile-' + name}
    className={`w-6 h-6 rounded-3xl border-white border-opacity-50 border m-1 ${className}`}
    style={{ backgroundColor: color }}
    onClick={(event) => {
      event?.preventDefault();
      onClick();
    }}
  />
);
