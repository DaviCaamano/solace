import { useHelloQuery } from '@store/services/api';
import { Header } from '@components/global/Header';
import axios from 'axios';

export default function Web() {
  const { data } = useHelloQuery();

  return (
    <div>
      <Header />
    </div>
  );
}
