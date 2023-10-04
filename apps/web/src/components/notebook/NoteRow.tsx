import { PropsWithChildren } from 'react';
import { AddNoteButton, RemoveNoteButton } from './buttons';
import { UnsafeAddNoteTrigger } from '#interfaces/notes';

interface NoteRowProps extends PropsWithChildren {
  addNote: UnsafeAddNoteTrigger;
}
export const NoteRow = ({ children: title, addNote }: NoteRowProps) => {
  return (
    <div className={'note-row h-8 text-[1.875rem] text-latte pl-4 leading-8 flex justify-start items-center'}>
      <div className={'note-title flex-1'}>{title}</div>
      <div>
        <AddNoteButton onClick={addNote} />
        <div className={'ml-4'} />
        <RemoveNoteButton onClick={() => {}} />
      </div>
    </div>
  );
};
