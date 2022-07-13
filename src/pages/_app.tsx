import type { AppProps } from 'next/app';

import 'src/styles/variables.css';
import 'src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;