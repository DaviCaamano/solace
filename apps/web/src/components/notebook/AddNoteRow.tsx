import { RefObject, useRef, useState } from 'react';
import { AddNoteButton } from './buttons';
import { NoteTitleInput } from '@components/notebook/NoteTitleInput';

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
      <NoteTitleInput
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
