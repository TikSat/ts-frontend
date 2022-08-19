import { GetServerSideProps, NextPage } from 'next';
import { ListingList } from '@core/components/ListingList';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';

interface CategoryPageProps {
  listings: ListingProps[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({ listings }) => {
  return <ListingList listings={listings}></ListingList>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const listings = await fetchApi(ApiRoutes(params).listings);
  return { props: { listings } };
};

export default CategoryPage;
