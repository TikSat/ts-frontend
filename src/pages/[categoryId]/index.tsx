import React from 'react';
import { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { NextPageWithLayout } from 'src/pages/_app';
import { ApiRoutes } from '@app/routes';
import { CategoryProps } from '@app/components/models/Category';
import { Main, MainPageProps } from '@app/components/pages/Main';
import { buildBreadcrumbs } from 'src/lib/api/breadcrumbs';

type CategoryPageProps = MainPageProps & { category: CategoryProps };

const CategoryPage: NextPageWithLayout<CategoryPageProps> = (props) => {
  const { category } = props;
  return <Main {...props} title={category.name} header={category.name} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const routes = ApiRoutes({ categoryId: params?.categoryId });
  const categoryData = await fetch(routes.category);
  const listingsData = await fetch(routes.listings);

  const category = categoryData?.data;
  const categories = category?.subcategories;
  const listings = listingsData?.data;

  let breadcrumbs = await buildBreadcrumbs({ categoryId: params?.categoryId });

  if (categoryData?.status == 200 && listingsData?.status == 200) {
    return {
      props: { listings, categories, category, breadcrumbs },
      revalidate: 30,
    };
  } else {
    return {
      props: { listings: [], categories: [], category: [], breadcrumbs: [] },
      revalidate: 30,
    };
  }
};

export async function getStaticPaths() {
  const paths = [];
  const routes = ApiRoutes({});
  const ids = await fetch(routes.categoriesIds);

  if (ids && ids.status == 200) {
    for (const categoryId of ids.data) {
      if (categoryId) paths.push({ params: { categoryId } });
    }
  }

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default CategoryPage;
