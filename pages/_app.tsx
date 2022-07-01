// Libraries
import { SessionProvider } from 'next-auth/react';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

// Types
import type { AppProps } from 'next/app';

// Styles
import '../styles/globals.css';
import 'react-phone-number-input/style.css';

import store from 'redux/store';

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

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={theme}>
        <Provider store={store}>
          <Toaster position="bottom-center" reverseOrder={false} />
          <Component {...pageProps} />
        </Provider>
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;
