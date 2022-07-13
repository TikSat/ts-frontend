import * as React from 'react';
import type { AppProps } from 'next/app';

import { Layout } from '@core/components/Layout';

import 'src/styles/variables.css';
import 'src/styles/globals.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>Tiksat</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}

export default MyApp;
