
// pages/_app.tsx v1.1.6
import React from 'react';
import type { AppProps } from 'next/app';
import '../app/style.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
