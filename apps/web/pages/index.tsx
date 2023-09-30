import { Header } from '@components/header/Header';
import { Notebook } from '@components/editor';
import { Content } from '@components/landing';

export default function Web() {
  return (
    <div id={'home-page'} className={'flex flex-col min-w-screen min-h-screen relative'}>
      <Header />
      <Notebook />
      <Content />
    </div>
  );
}
