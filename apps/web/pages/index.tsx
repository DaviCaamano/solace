import { Header } from '@components/global/Header';
import { SideBar } from '@components/sidebar';
import { NoteList } from '@components/notes';
import { MenuContainer } from '@components/menu';

export default function Web() {
  return (
    <div
      id={'home-page'}
      className={'flex flex-col min-w-screen min-h-screen relative'}
    >
      <Header />
      <NoteList />
      {/*<SideBar />*/}
      <MenuContainer />
    </div>
  );
}
