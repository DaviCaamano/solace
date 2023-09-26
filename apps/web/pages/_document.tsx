import { Html, Head, Main, NextScript } from 'next/document';
import { droidFont, montserratFont } from '@fonts/index';

export default function Document() {
  return (
    <Html lang='en' className={`${droidFont.variable} ${montserratFont.variable}`}>
      <Head>
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
