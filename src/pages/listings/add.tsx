import { NextPageWithLayout } from '../_app';
import { MainPageProps } from '@app/components/pages/Main';
import Head from 'next/head';

const AddPage: NextPageWithLayout<MainPageProps> = () => {
  return (
    <Head>
      <title>Add new ad | Tiksat</title>
    </Head>
  );
};

export default AddPage;
