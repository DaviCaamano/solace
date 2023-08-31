import '@styles/global.css';
import { Background } from '@components/global/Background';

import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReduxProvider } from '@components/providers';
import { montserratFont } from '@fonts/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main id={'main'} className={montserratFont.className}>
      <UserProvider>
        <ReduxProvider>
          <Background>
            <Component {...pageProps} />
          </Background>
        </ReduxProvider>
      </UserProvider>
    </main>
  );
}

export default MyApp;
