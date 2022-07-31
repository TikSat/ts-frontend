import { GetServerSideProps, NextPage } from 'next';
import { CategoryType } from '@core/components/Category/Category';

const CategoryPage: NextPage<CategoryType> = ({ category }) => {
  return <h1>{category.name}</h1>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Fetch data from external API
  const slug = context.params?.categorySlug;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`http://localhost:3000/api/categories/${slug}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return { props: { category: data } };
};

export default CategoryPage;
