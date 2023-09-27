import { Header } from '@components/global/Header';
import { NoteList } from '@components/notes';
import { Content } from '@components/landing';

export default function Web() {
  return (
    <div id={'home-page'} className={'flex flex-col min-w-screen min-h-screen relative'}>
      <Header />
      <NoteList />
      <Content />
    </div>
  );
}
