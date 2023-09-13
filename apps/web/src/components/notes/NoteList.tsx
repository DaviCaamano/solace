import { useLazyListNotesQuery } from '@context/redux/notes';

export const NoteList = () => {
  const [getNotes, args] = useLazyListNotesQuery();
  const { isLoading, isSuccess, isError, error } = args;
  console.log('args', args);
  console.log('error', error);

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    // @ts-ignore
    return <div>{error?.message}</div>;
  }
  if (isSuccess) {
    return (
      <section className={'w-full h-full flex justify-center, items-center'}>
        <h1>Notes</h1>
      </section>
    );
  }
};
