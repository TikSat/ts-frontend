import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import { Layout } from '@app/components/containers/Layout';
import { PwaHead } from '@app/components/containers/PwaHead/PwaHead';
import 'src/styles/variables.css';
import 'src/styles/globals.scss';
import { appWithTranslation } from 'next-i18next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  setLayout?: () => string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout =
    Component.setLayout ??
    (() => {
      return 'user';
    });
  return (
    <Provider store={store}>
      <Layout layoutType={layout}>
        <PwaHead />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
