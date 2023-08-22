import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/store';
import '@styles/global.css';
import { Background } from '@components/global/Background';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Background>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Background>
  );
}

export default MyApp;
