// Libraries
import { SessionProvider } from 'next-auth/react';

// Types
import type { AppProps } from 'next/app';

// Styles
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
