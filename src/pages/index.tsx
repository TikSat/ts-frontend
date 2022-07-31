import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { CategoryList } from '@core/components/CategoryList';
import { CategoryListType } from '@core/components/CategoryList/CategoryList';

const Home: NextPage<CategoryListType> = ({ categories }) => {
  return <CategoryList categories={categories}></CategoryList>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch('http://localhost:3000/api/categories');
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { categories: data } };
};

export default Home;
