import { GetServerSideProps, NextPage } from 'next';
import { ListingType } from '@core/components/ListingPreview/ListingPreview';
import { Listing } from '@core/components/Listing';

const ListingPage: NextPage<ListingType> = (listing) => {
  return <Listing {...listing}></Listing>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const categoryId = context.params?.categoryId;
  const listingId = context.params?.listingId;
  if (!categoryId && !listingId) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `http://localhost:3000/api/categories/${categoryId}/listings/${listingId}`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: data };
};

export default ListingPage;
