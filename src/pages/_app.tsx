import type { AppProps } from 'next/app';

import { Layout } from '@core/components/Layout';

import 'src/styles/variables.css';
import 'src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
