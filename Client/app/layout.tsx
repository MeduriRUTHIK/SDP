'use client';
import './globals.css';
import { Poppins } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';

import { ThemeProvider } from './utils/theme-provider';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Providers } from './Provider';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

import Loader from './components/Loader/Loader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins',
});

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap'
          rel='stylesheet'
        ></link>
      </head>
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 `}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Costom>{children}</Costom>
              <ToastContainer />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Costom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  return <>{isLoading ? <Loader /> : <> {children}</>}</>;
};
