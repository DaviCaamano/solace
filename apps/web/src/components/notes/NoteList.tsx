import { useSelector } from 'react-redux';
// import { selectNotesResult, useGetNotesQuery } from '@context/redux';
//
// export const NoteList = () => {
//   const args = useGetNotesQuery();
//
//   console.log('useGetNotesQuery', useGetNotesQuery);
//
//   const { isLoading, isSuccess, isError, error } = args;
//   const orderedNotes = useSelector(selectNotesResult);
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>{error.message}</div>;
//   if (isSuccess) {
//     return (
//       <section className={'w-full h-full flex justify-center, items-center'}>
//         <h1>Notes</h1>
//       </section>
//     );
//   }
// };
