import { Modal } from '@components/shared';
import { useDeleteNoteMutation } from '@context/redux/api/notes/notes.slice';
import { DeleteNoteHandler } from '#interfaces/notes';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

enum Prompts {
  deleteNote, //Delete just the single note
  deleteChildren, //Delete the note and all of its children
}
interface DeleteNoteModalProps {
  deleteNoteHandler: DeleteNoteHandler;
  userId: string | undefined;
}
export const DeleteNoteModal = ({ deleteNoteHandler: { markDelete, setMarkDelete }, userId }: DeleteNoteModalProps) => {
  const [prompt, setPrompt] = useState<Prompts>(Prompts.deleteNote);
  const [deleteNote] = useDeleteNoteMutation();

  if (!userId || !markDelete) {
    return null;
  }

  const onClick = async () => {
    await deleteNote({ id: markDelete.id, userId, deleteChildren: prompt === Prompts.deleteChildren });
    setMarkDelete(undefined);
  };

  return (
    <Modal open={!!markDelete} close={() => setMarkDelete(undefined)}>
      <div
        id={'note-book-delete-modal'}
        className={'relative w-full md:w-[43.75rem] flex flex-col mb-[-0.25rem] pt-4  justify-center items-center'}
        style={{ maxWidth: 'calc(100vw - 1.25rem)' }}
      >
        <div className={'flex justify-center absolute w-full pointer-events-none my-4'} style={{ top: '-15px' }}>
          <DeleteForeverIcon className={'text-mug-light w-[2rem]'} />
        </div>
        <div id={'delete-modal-description'} className={'mt-4 mb-4 md:mb-2'}>
          Are you sure you want <br className={'md:hidden'} />
          to delete this note?
        </div>
        <div id={'delete-modal-title'} className={'mb-4 md:mb-2'}>
          <FormatQuoteIcon style={{ transform: 'scaleX(-1)', fontSize: '16px' }} className={'relative bottom-2'} />
          <span className={'font-semibold'}>{markDelete.title}</span>
          <FormatQuoteIcon style={{ fontSize: '16px' }} className={'relative bottom-2'} />
        </div>
        <div
          id={'delete-modal-button-container'}
          className={'flex flex-col md:flex-row w-full justify-between px-12 mt-2'}
        >
          <DeleteChildrenCheckbox checked={prompt} setChecked={setPrompt} />
          <div className={'h-8 w-[184px] mx-auto md:m-0'}>
            <button
              id={'delete-modal-confirm-button'}
              data-testid={'delete-modal-confirm-button'}
              className={'py-[1px] h-full text-[12px] rounded-2xl text-latte w-[5rem] bg-mug-light'}
              onClick={onClick}
            >
              <CheckIcon />
            </button>
            <button
              id={'delete-modal-cancel-button'}
              className={'py-[1px] h-full text-[12px] rounded-2xl bg-mug-light text-latte ml-6 w-[5rem]'}
              onClick={() => setMarkDelete(undefined)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

interface DeleteChildrenCheckboxProps {
  checked: Prompts;
  setChecked: Setter<Prompts>;
}
const DeleteChildrenCheckbox = ({ checked, setChecked }: DeleteChildrenCheckboxProps) => {
  const onClick = () => setChecked(checked === Prompts.deleteChildren ? Prompts.deleteNote : Prompts.deleteChildren);
  return (
    <div
      className={
        'delete-children-prompt h-6 mb-5 md:mb-3 mt-1 flex justify-center items-center cursor-pointer select-none text-end'
      }
      onClick={onClick}
    >
      Delete all attached <br className={'md:hidden'} /> notes as well:
      <Checkbox className={'ml-2'} checked={checked === Prompts.deleteChildren} onClick={onClick} />
    </div>
  );
};

interface CheckboxProps {
  checked: boolean;
  className?: string;
  onClick: () => void;
}
const Checkbox = ({ checked, className, onClick }: CheckboxProps) => (
  <div className={`${className} inline-flex h-5 w-5 overflow-hidden select-none`} onClick={onClick}>
    <div className={'h-5 w-5 border-mug-light border-[2px] rounded p-[2px] flex justify-center items-center'}>
      {checked && <div className={'bg-mug-light w-full h-full mx-auto'} />}
    </div>
  </div>
);
