import styles from '@components/notebook/notebook.module.css';
import { AddNoteButton, RemoveNoteButton } from '@components/notebook';

interface RowButtonsProps {
  deleteNote: () => void;
  createChildToggle: Setter<boolean>;
  show: boolean;
}
export const RowButtons = ({ createChildToggle, deleteNote, show }: RowButtonsProps) => {
  return (
    <div className={'row-buttons-container w-16 h-8 ' + show ? 'block' : 'hidden'}>
      <div className={`row-buttons ${styles.noteRowButtons} h-full flex-row justify-center items-center`}>
        <AddNoteButton onClick={() => createChildToggle(true)} />
        <div className={'ml-2'} />
        <RemoveNoteButton onClick={deleteNote} />
        <div className={'mr-2'} />
      </div>
    </div>
  );
};
