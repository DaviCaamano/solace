import '@styles/global.css';
import { Background } from '@components/global/Background';

import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Background>
        <Component {...pageProps} />
      </Background>
    </UserProvider>
  );
}

export default MyApp;
