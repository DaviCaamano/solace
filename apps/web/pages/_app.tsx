import '@styles/global.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@context/redux';
import { Background } from '@components/global/Background';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { authApi } from '@services/api/redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApiProvider api={authApi}>
        <UserProvider>
          <Background>
            <Component {...pageProps} />
          </Background>
        </UserProvider>
      </ApiProvider>
    </Provider>
  );
}

export default MyApp;
