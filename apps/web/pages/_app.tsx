import '@styles/global.css';
import { Background } from '@components/global/Background';

import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReduxProvider } from '@components/providers';
import { droidFont, montserratFont } from '@fonts/index';
import { useClearLocalStorage } from '@hooks/local-storage';

function MyApp({ Component, pageProps }: AppProps) {
  useClearLocalStorage();
  return (
    <main
      id={'main'}
      className={`${droidFont.variable} ${montserratFont.variable} ${droidFont.className} ${montserratFont.className}`}
    >
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
