import { GetServerSideProps, NextPage } from 'next';
import { ListingList } from '@core/components/ListingList';
import { fetchApi } from '@core/helpers';

const CategoryPage: NextPage = ({ data: listings }) => {
  return <ListingList listings={listings}></ListingList>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.categoryId;
  if (!id) {
    return {
      notFound: true,
    };
  }

  return await fetchApi(`http://localhost:3000/api/categories/${id}/listings`);
};

export default CategoryPage;
