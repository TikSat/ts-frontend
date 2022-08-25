import type { GetStaticProps } from 'next';
import { fetch } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { Main, MainPageProps } from '@core/components/pages/Main';
import { NextPageWithLayout } from 'src/pages/_app';
import categoryId from 'src/pages/[categoryId]';

const HomePage: NextPageWithLayout<MainPageProps> = (props) => {
  return <Main {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let routes = ApiRoutes({});

  const categoriesData = await fetch(routes.categories, { params: { root: true } });
  const listingsData = await fetch(routes.recommended);

  const categories = categoriesData?.data;
  const listings = listingsData?.data;

  const breadcrumbs = [{ title: 'Istanbul', url: '/', current: true }];

  return {
    props: {
      categories: categories || [],
      listings: listings || [],
      breadcrumbs: breadcrumbs || [],
    },
    revalidate: 30,
  };
};

export default HomePage;
