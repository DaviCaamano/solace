import { useState } from 'react';
import { AddNoteButton } from '../buttons';
import { NoteTitleInput } from '@components/notebook/input/NoteTitleInput';

interface AddNoteRowProps {
  onClick: (title: string) => void;
}
export const AddNoteRow = ({ onClick }: AddNoteRowProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const addNote = () => {
    if (toggle && title) {
      onClick(title);
    } else {
      setToggle(true);
    }
  };

  return (
    <div className={'h-8 text-[1.875rem] text-latte pl-4 pr-2 leading-8 flex justify-start items-center'}>
      <NoteTitleInput
        toggle={toggle}
        title={title}
        setTitle={setTitle}
        onBlur={() => setToggle(false)}
        onSubmit={() => onClick(title)}
      />
      <AddNoteButton onClick={addNote} />
    </div>
  );
};
