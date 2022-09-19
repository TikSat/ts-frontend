import { NextPageWithLayout } from '../_app';
import { MainPageProps } from '@app/components/pages/Main';
import Head from 'next/head';

const MessagesPage: NextPageWithLayout<MainPageProps> = () => {
  return (
    <Head>
      <title>My messages | Tiksat</title>
    </Head>
  );
};

export default MessagesPage;
