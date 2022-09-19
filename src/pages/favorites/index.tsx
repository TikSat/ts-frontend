import { NextPageWithLayout } from '../_app';
import { MainPageProps } from '@app/components/pages/Main';
import Head from 'next/head';

const FavoritesPage: NextPageWithLayout<MainPageProps> = () => {
  return (
    <Head>
      <title>My favorites | Tiksat</title>
    </Head>
  );
};

export default FavoritesPage;
