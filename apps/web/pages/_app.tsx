import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/store';
import '@styles/global.css';
import { Background } from '@components/global/Background';
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider>
        <Background>
          <Component {...pageProps} />
        </Background>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
