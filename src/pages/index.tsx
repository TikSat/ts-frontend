import type { GetStaticProps } from 'next';
import { fetch } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { Main, MainPageProps } from '@core/components/pages/Main';
import { NextPageWithLayout } from 'src/pages/_app';

const HomePage: NextPageWithLayout<MainPageProps> = (props) => {
  return <Main {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let routes = ApiRoutes({});
  const categories = await fetch(routes.categories);
  const listings = await fetch(routes.recommended);
  const breadcrumbs = [{ title: 'Istanbul', url: '/', current: true }];

  return {
    props: {
      categories: categories || null,
      listing: listings || null,
      breadcrumbs: breadcrumbs || null,
    },
    revalidate: 30,
  };
};

export default HomePage;
