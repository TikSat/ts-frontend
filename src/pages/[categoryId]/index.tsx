import { GetServerSideProps, NextPage } from 'next';
import { ListingList } from '@core/components/ListingList';
import { ListingListType } from '@core/components/ListingList/ListingList';

const CategoryPage: NextPage<ListingListType> = ({ listings }) => {
  return <ListingList listings={listings}></ListingList>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const slug = context.params?.categoryId;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`http://localhost:3000/api/categories/${slug}/listings`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { listings: data } };
};

export default CategoryPage;
