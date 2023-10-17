import styles from '@components/notebook/notebook.module.scss';
import { AddNoteButton, RemoveNoteButton } from './AddNoteButton';
interface RowButtonsProps {
  createChildToggle: Setter<boolean>;
  markedForDeletion: () => void;
}
export const RowButtons = ({ createChildToggle, markedForDeletion }: RowButtonsProps) => {
  return (
    <div className={'row-buttons-container absolute right-0 w-16 h-8 block'}>
      <div className={`row-buttons ${styles.noteRowButtons} h-full flex-row justify-center items-center`}>
        <AddNoteButton onClick={() => createChildToggle(true)} />
        <div className={'ml-2'} />
        <RemoveNoteButton onClick={markedForDeletion} />
        <div className={'mr-2'} />
      </div>
    </div>
  );
};
