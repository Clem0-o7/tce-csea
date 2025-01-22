import { SessionProvider } from 'next-auth/react';
import { Providers } from './_providers';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </SessionProvider>
  );
}

export default MyApp;
