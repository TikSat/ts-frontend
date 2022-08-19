import { GetServerSideProps, NextPage } from 'next';
import { Listing } from '@core/components/Listing';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';

interface ListingPageProps {
  listing: ListingProps;
}

const ListingPage: NextPage<ListingPageProps> = ({ listing }) => {
  return <Listing {...listing}></Listing>;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const listing = await fetchApi(ApiRoutes(params).listing);
  return { props: { listing } };
};

export default ListingPage;
