import { GetServerSideProps, NextPage } from 'next';
import { ListingList } from '@core/components/ListingList';
import { ListingListType } from '@core/components/ListingList/ListingList';
import { fetchApi } from '@core/helpers';

const CategoryPage: NextPage<ListingListType> = ({ data }) => {
  return <ListingList data={data}></ListingList>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.categoryId;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  return await fetchApi(`http://localhost:3000/api/categories/${slug}/listings`);
};

export default CategoryPage;
