import '@styles/global.css';
import { Background } from '@components/global/Background';

import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReduxProvider } from '@components/providers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ReduxProvider>
        <Background>
          <Component {...pageProps} />
        </Background>
      </ReduxProvider>
    </UserProvider>
  );
}

export default MyApp;
