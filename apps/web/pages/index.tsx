import { Header } from '@components/header/Header';
import { Content } from '@components/landing';

export default function Web() {
  return (
    <div id={'home-page'} className={'flex flex-col-reverse min-w-screen min-h-screen relative'}>
      <Content />
      <Header />
    </div>
  );
}
