import { RefObject, useRef, useState } from 'react';
import { AddNoteButton } from './buttons';

type InputRef = RefObject<HTMLInputElement>;
interface AddNoteRowProps {
  onClick: (title: string) => void;
}
export const AddNoteRow = ({ onClick }: AddNoteRowProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const inputRef: InputRef = useRef<HTMLInputElement>(null);
  const addNote = () => {
    if (toggle && title) {
      onClick(title);
    } else {
      setToggle(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div className={'h-8 text-[1.875rem] text-latte px-4 leading-8 flex justify-start items-center'}>
      <TitleInput
        toggle={toggle}
        inputRef={inputRef}
        title={title}
        setTitle={setTitle}
        setToggle={setToggle}
        onSubmit={() => onClick(title)}
      />
      <AddNoteButton onClick={addNote} />
    </div>
  );
};

const TitleInput = ({
  toggle,
  inputRef,
  onSubmit,
  setToggle,
  title,
  setTitle,
}: {
  toggle: boolean;
  inputRef: InputRef;
  onSubmit: () => void;
  setToggle: Setter<boolean>;
  title: string;
  setTitle: Setter<string>;
}) => (
  <input
    id={'add-note-button'}
    data-testid={'add-note-button'}
    className={`${toggle ? 'block flex-1' : 'w-0'} w-full border-0 bg-mug text-xl`}
    ref={inputRef}
    onBlur={() => {
      if (!title) {
        setToggle(false);
      }
    }}
    value={title}
    onChange={(event) => setTitle(event.target.value)}
    onKeyUp={(event) => event.key === 'Enter' && onSubmit()}
  />
);
