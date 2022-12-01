// Libraries
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';

// Types
import type { AppProps } from 'next/app';

// Styles
import '../styles/globals.css';
import 'react-phone-number-input/style.css';

// Constants
const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primaryLight: '#7DA4F1',
      primaryLightHover: '#588AED',
      primaryLightActive: '#3371E9',
      primaryLightContrast: '#1245A8',
      primary: '#185ADB',
      primaryBorder: '#185ADB',
      primaryBorderHover: '#1245A8',
      primarySolidHover: '#0D3076',
      primarySolidContrast: '$white',
      primaryShadow: '#185ADB',

      secondaryLight: '#FFEDC1',
      secondaryLightHover: '#FFE199',
      secondaryLightActive: '#FFD570',
      secondaryLightContrast: '#FFB90F',
      secondary: '#FFC947',
      secondaryBorder: '#FFC947',
      secondaryBorderHover: '#FFB90F',
      secondarySolidHover: '#D69700',
      secondarySolidContrast: '#020711',
      secondaryShadow: '#FFC947',
    },
  },
});

interface MyAppProps extends AppProps {
  pageProps: {
    session: any;
  };
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={theme}>
        <NextNProgress color="#185ADB" options={{ showSpinner: false }} />
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;
