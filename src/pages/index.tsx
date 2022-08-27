import type { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';
import { Main, MainPageProps } from '@app/components/pages/Main';
import { NextPageWithLayout } from 'src/pages/_app';

const HomePage: NextPageWithLayout<MainPageProps> = (props) => {
  return <Main {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let routes = ApiRoutes({});

  const categoriesData = await fetch(routes.categories, {
    params: {
      root: true,
      response: { include: ['id', 'name', 'slug'] },
    },
  });
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
