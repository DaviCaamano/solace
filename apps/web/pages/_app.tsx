import '@styles/global.css';
import { Background } from '@components/global/Background';

import type { AppProps } from 'next/app';
import { droidFont, montserratFont } from '@fonts/index';
import { useClearLocalStorage } from '@hooks/local-storage';
import { Providers } from '@components/providers/Providers';

function MyApp({ Component, pageProps }: AppProps) {
  useClearLocalStorage();
  return (
    <main
      id={'main'}
      className={`${droidFont.variable} ${montserratFont.variable} ${droidFont.className} ${montserratFont.className}`}
    >
      <Providers>
        <Background>
          <Component {...pageProps} />
        </Background>
      </Providers>
    </main>
  );
}

export default MyApp;
