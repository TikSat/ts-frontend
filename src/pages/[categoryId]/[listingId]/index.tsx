import { GetServerSideProps, NextPage } from 'next';
import { ListingProps } from '@core/components/ListingPreview/ListingPreview';
import { Listing } from '@core/components/Listing';
import { fetchApi } from '@core/helpers';

const ListingPage: NextPage<ListingProps> = (listing) => {
  return <Listing {...listing}></Listing>;
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const categoryId = context.params?.categoryId;
//   const listingId = context.params?.listingId;
//   if (!categoryId && !listingId) {
//     return {
//       notFound: true,
//     };
//   }
//
//   return await fetchApi(`http://localhost:3000/api/categories/${categoryId}/listings/${listingId}`);
// };

export default ListingPage;
