import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { CategoryList } from '@core/components/CategoryList';
import { CategoryListProps } from '@core/components/CategoryList/CategoryList';
import { fetchApi } from '@core/helpers';

const Home: NextPage<CategoryListProps> = ({ data: categories }) => {
  return <CategoryList categories={categories}></CategoryList>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return await fetchApi('http://localhost:3000/api/categories');
};

export default Home;
