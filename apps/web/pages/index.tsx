import { useHelloQuery } from '@store/services/api';
import { Header } from '@components/global/Header';
import axios from 'axios';

export default function Web() {
  const { data } = useHelloQuery();

  axios.get('http://localhost:5002/api/auth/callback').then((res) => {
    console.log(res);
  });
  return (
    <div>
      <Header />
    </div>
  );
}
