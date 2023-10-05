import { PropsWithChildren, RefObject, useRef, useState } from 'react';
import { AddNoteButton, RemoveNoteButton } from './buttons';
import { LinkedNote, UnsafeAddNoteTrigger, UnsafeDeleteNoteTrigger } from '#interfaces/notes';
import { NoteTitleInput } from '@components/notebook/NoteTitleInput';

type InputRef = RefObject<HTMLInputElement>;

interface NoteRowProps extends PropsWithChildren {
  addNote: UnsafeAddNoteTrigger;
  deleteNote: UnsafeDeleteNoteTrigger;
  note: LinkedNote;
  setEditor: (title: string, content: string) => void;
}
export const NoteRow = ({ addNote, deleteNote, note, setEditor }: NoteRowProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const inputRef: InputRef = useRef<HTMLInputElement>(null);
  const addNoteOnClick = () => {};
  const deleteNoteOnClick = () => {};
  const sendNoteToEditor = () => {};

  //TODO FOR NOTE ROW:
  //Send Note to Editor
  //Allow creation of child note
  //Allow Deletion of Note
  // [Done] Display Note Children
  //    [Done] Recursively display children of children
  //Allow Drag re-ordering of children ((SEE TODO IN notes.slice.ts))
  //    Allow change in dept of Note as part of reordering

  return (
    <div className={'note-row h-8 text-[24px] text-latte pl-4 leading-8 flex justify-start items-center'}>
      <NoteTitleInput
        toggle={toggle}
        inputRef={inputRef}
        title={title}
        setTitle={setTitle}
        setToggle={setToggle}
        onSubmit={sendNoteToEditor}
      />
      <div>
        <AddNoteButton onClick={addNoteOnClick} />
        <div className={'ml-4'} />
        <RemoveNoteButton onClick={deleteNoteOnClick} />
      </div>
    </div>
  );
};
