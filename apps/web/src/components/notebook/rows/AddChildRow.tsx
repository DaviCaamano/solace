import styles from '../notebook.module.css';
import { RefObject, useEffect, useRef, useState } from 'react';
type InputRef = RefObject<HTMLInputElement>;
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { NoteTitleInput } from '../input';
import { NoteRowButton } from '@components/notebook';

interface NoteChildRowProps {
  onSubmit: (title: string) => void;
  setToggle: Setter<boolean>;
  toggle: boolean;
}

export const AddChildRow = ({ onSubmit, setToggle, toggle }: NoteChildRowProps) => {
  const [title, setTitle] = useState<string>('');

  return (
    <div className={`note-child-row ${styles.childRow} ${toggle ? 'flex' : 'hidden'}`}>
      <NoteTitleInput
        toggle={toggle}
        title={title}
        setTitle={setTitle}
        onBlur={() => {}}
        onSubmit={() => onSubmit(title)}
      />
      <NoteRowButton
        disabled={!title}
        name={'add-new-child-note'}
        onClick={() => {
          onSubmit(title);
          setToggle(false);
        }}
      >
        <CheckIcon sx={{ width: '1rem' }} />
      </NoteRowButton>
      <div className={'mr-2'} />
      <NoteRowButton name={'cancel-new-child-note'} onClick={() => setToggle(false)}>
        <CloseIcon sx={{ width: '1rem' }} />
      </NoteRowButton>
      <div className={'mr-2'} />
    </div>
  );
};