import { Header } from '@components/global/Header';
import { userSlice } from '@context/redux/user';
// import { NoteList } from '@components/notes';

export default function Web() {
  console.log('userSlice', userSlice);
  return (
    <div>
      <Header />
      {/*<NoteList />*/}
    </div>
  );
}
