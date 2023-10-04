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
    id={'add-note-input'}
    data-testid={'add-note-input'}
    className={`${toggle ? 'block' : 'pointer-events-none'} flex-1 px-2 border-0 bg-mug text-xl`}
    ref={inputRef}
    placeholder={toggle ? 'Title' : ''}
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
