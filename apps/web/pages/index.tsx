import { Header } from '@components/header/Header';
import { Content } from '@components/landing';
import { Notebook } from '@components/notebook';

export default function Web() {
  return (
    <div id={'home-page'} className={'flex flex-col min-w-screen min-h-screen relative'}>
      <Header />
      <Notebook />
      <Content />
    </div>
  );
}
