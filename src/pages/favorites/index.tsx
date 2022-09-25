import type { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';
import { Main, MainPageProps } from '@app/components/pages/Main';
import { NextPageWithLayout } from 'src/pages/_app';
import { ListingListProps } from '@app/components/containers/ListingList';

const FavoritesPage: NextPageWithLayout<MainPageProps> = (props) => {
  return <Main {...props} title={'Favorites'} header={'My Favorites'} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let routes = ApiRoutes({});
  const listingsData = await fetch(routes.recommended, {
    params: {
      response: {
        include: ['id', 'title', 'price', 'slug', 'image_medium', 'image_extra_small', 'category'],
      },
    },
  });

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

  if (listingsData?.status == 200) {
    return {
      props: {
        listingList,
      },
      revalidate: 30,
    };
  } else {
    return {
      props: {
        listingList: [],
      },
      revalidate: 30,
    };
  }
};

export default FavoritesPage;
