import styles from '@components/notebook/notebook.module.scss';
import { AddNoteButton, RemoveNoteButton } from '@components/notebook';
interface RowButtonsProps {
  createChildToggle: Setter<boolean>;
  markDelete: () => void;
}
export const RowButtons = ({ createChildToggle, markDelete }: RowButtonsProps) => {
  return (
    <div className={'row-buttons-container absolute right-0 w-16 h-8 block'}>
      <div className={`row-buttons ${styles.noteRowButtons} h-full flex-row justify-center items-center`}>
        <AddNoteButton onClick={() => createChildToggle(true)} />
        <div className={'ml-2'} />
        <RemoveNoteButton onClick={markDelete} />
        <div className={'mr-2'} />
      </div>
    </div>
  );
};
