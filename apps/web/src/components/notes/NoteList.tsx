import { useListNotes } from '@hooks';

export const NoteList = () => {
  const args = useListNotes();
  const { isLoading, isSuccess, isError, error, data: noteList } = args;
  console.log('noteList', noteList);
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    // @ts-ignore
    return <div>{error?.message}</div>;
  }
  if (isSuccess) {
    return (
      <section className={'w-full h-full flex justify-center, items-center'}>
        {noteList?.map(({ title }) => <h1>{title}</h1>)}
      </section>
    );
  }
};
