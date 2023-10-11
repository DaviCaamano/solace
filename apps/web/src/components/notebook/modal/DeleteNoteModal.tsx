import { Modal } from '@components/shared';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useDeleteNoteMutation } from '@context/redux/api/notes/notes.slice';
import { DeleteNoteHandler } from '#interfaces/notes';

interface DeleteNoteModalProps {
  deleteNoteHandler: DeleteNoteHandler;
  userId: string | undefined;
}
export const DeleteNoteModal = ({ deleteNoteHandler: { markDelete, setMarkDelete }, userId }: DeleteNoteModalProps) => {
  const [deleteNote] = useDeleteNoteMutation();

  if (!userId || !markDelete) {
    return null;
  }
  return (
    <Modal open={!!markDelete} close={() => setMarkDelete(undefined)}>
      <div
        id={'note-book-delete-modal'}
        className={'relative w-[43.75rem] flex flex-col mb-[-0.25rem] pt-4  justify-center items-center'}
        style={{ maxWidth: 'calc(100vw - 1.25rem)' }}
        onSubmit={() => deleteNote({ id: markDelete.id, userId })}
      >
        <div className={'flex justify-center absolute w-full pointer-events-none my-4'} style={{ top: '-15px' }}>
          <DeleteForeverIcon className={'text-mug-light w-[2rem]'} />
        </div>
        <div id={'delete-modal-description'} className={'mt-4 mb-2'}>
          Are you sure you want to delete this note?
        </div>
        <div id={'delete-modal-title'} className={'mb-2'}>
          <FormatQuoteIcon style={{ transform: 'scaleX(-1)', fontSize: '16px' }} className={'relative bottom-2'} />
          <span className={'font-semibold'}>{markDelete.title}</span>
          <FormatQuoteIcon style={{ fontSize: '16px' }} className={'relative bottom-2'} />
        </div>
        <div id={'delete-modal-button-container'} className={'flex flex-row justify-end mt-2'}>
          <button
            id={'delete-modal-confirm-button'}
            data-testid={'delete-modal-confirm-button'}
            className={'py-[1px] text-[12px] rounded-2xl text-latte w-[5rem] bg-mug-light'}
            onClick={() => deleteNote({ id: markDelete.id, userId })}
          >
            <CheckIcon />
          </button>
          <button
            id={'delete-modal-cancel-button'}
            className={'py-[1px] text-[12px] rounded-2xl bg-mug-light text-latte ml-6 w-[5rem]'}
            onClick={() => setMarkDelete(undefined)}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </Modal>
  );
};
