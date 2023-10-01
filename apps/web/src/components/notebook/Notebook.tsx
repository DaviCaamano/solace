import { useListNotes } from '@hooks/context';

export const Notebook = () => {
  const args = useListNotes();
  const { isLoading, isSuccess, isError, error, data: noteList } = args;
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
