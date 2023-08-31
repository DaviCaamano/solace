import { Header } from '@components/global/Header';
import { SideBar } from '@components/sidebar';
// import { NoteList } from '@components/notes';

export default function Web() {
  return (
    <div id={'home-page'} className={'min-w-screen min-h-screen relative'}>
      <Header />
      {/*<NoteList />*/}
      <SideBar />
    </div>
  );
}
