import type { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';
import { Main, MainPageProps } from '@app/components/pages/Main';
import { NextPageWithLayout } from 'src/pages/_app';
import { buildBreadcrumbs } from 'src/lib/api/breadcrumbs';
import { ListingListProps } from '@app/components/containers/ListingList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HomePage: NextPageWithLayout<MainPageProps> = (props) => {
  return <Main {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  let routes = ApiRoutes({});
  const categoriesData = await fetch(routes.categories, {
    params: {
      locale: locale,
      root: true,
      response: { include: ['id', 'name', 'slug', 'image_small', 'listings_count'] },
    },
  });
  const listingsData = await fetch(routes.recommended, {
    params: {
      locale: locale,
      response: {
        include: ['id', 'title', 'price', 'slug', 'image_medium', 'image_extra_small', 'category'],
      },
    },
  });

  const categories = categoriesData?.data;

  let listingList: ListingListProps = {
    listings: [],
    currentPage: 1,
    totalPages: 1,
    url: '/',
    apiUrl: routes.recommended,
  };

  listingList.listings = listingsData?.data;
  listingList.currentPage = parseInt(listingsData?.headers['current-page']);
  listingList.totalPages = parseInt(listingsData?.headers['total-pages']);

  const breadcrumbs = await buildBreadcrumbs({});

  if (listingsData?.status == 200 && categoriesData?.status == 200) {
    return {
      props: {
        categories,
        listingList,
        breadcrumbs,
        ...(await serverSideTranslations(locale as string)),
      },
      revalidate: 30,
    };
  } else {
    return {
      props: {
        categories: [],
        listingList: [],
        breadcrumbs: breadcrumbs,
        ...(await serverSideTranslations(locale as string)),
      },
      revalidate: 30,
    };
  }
};

export default HomePage;
