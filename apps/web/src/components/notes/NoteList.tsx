import { useListNotesLazyQuery } from '@context/redux/notes';

export const NoteList = () => {
  const [getNotes, args] = useListNotesLazyQuery();
  const { isLoading, isSuccess, isError, error } = args;
  console.log('args', args);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{(error as any).message}</div>;
  if (isSuccess) {
    return (
      <section className={'w-full h-full flex justify-center, items-center'}>
        <h1>Notes</h1>
      </section>
    );
  }
};
