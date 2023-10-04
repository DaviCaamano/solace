import { PropsWithChildren } from 'react';

interface AddNoteButtonProps {
  onClick: () => any;
}
export const AddNoteButton = ({ onClick }: AddNoteButtonProps) => <Button onClick={onClick}>+</Button>;
export const RemoveNoteButton = ({ onClick }: AddNoteButtonProps) => <Button onClick={onClick}>-</Button>;

const Button = ({ children, onClick }: AddNoteButtonProps & PropsWithChildren) => (
  <button
    id={'add-note-button'}
    data-testid={'add-note-button'}
    className={'flex justify-center items-center rounded-3xl bg-mug-light h-6 w-6 ml-4'}
    onClick={onClick}
  >
    {children}
  </button>
);
