import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { fetch } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';
import { CategoryProps } from '@core/components/Category/Category';
import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import { Main } from '@core/components/pages/Main';
import { NextPageWithLayout } from 'src/pages/_app';

interface CategoryPageProps {
  listings: ListingProps[];
  categories: CategoryProps[];
  category: CategoryProps;
  breadcrumbs: BreadcrumbProps[];
}

const CategoryPage: NextPageWithLayout<CategoryPageProps> = ({
  listings,
  categories,
  category,
  breadcrumbs,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{category?.name}</title>
      </Head>

      <Main
        breadcrumbs={breadcrumbs}
        categories={categories}
        listings={listings}
        title={category?.name}
        header={category?.name}
      />
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const routes = ApiRoutes({ categoryId: params?.categoryId });
  const categoryData = await fetch(routes.category);
  const listingsData = await fetch(routes.listings);

  const category = categoryData?.data;
  const categories = category?.subcategories;
  let parentCategory;

  if (category?.parent_id) {
    const parentCategoryData = await fetch(ApiRoutes({ categoryId: category.parent_id }).category);
    parentCategory = parentCategoryData?.data;
  }

  const breadcrumbs = [
    {
      title: 'Istanbul',
      url: '/',
      current: false,
    },
    {
      title: parentCategory ? parentCategory.name : null,
      url: parentCategory ? `/${parentCategory.id}` : null,
      current: false,
    },
    {
      title: category?.name || null,
      url: `/${category?.id}`,
      current: true,
    },
  ];

  return {
    props: {
      listings: listingsData?.data || [],
      categories: categories || [],
      category: category || [],
      breadcrumbs: breadcrumbs || [],
    },
    revalidate: 30,
  };
};

export async function getStaticPaths() {
  const paths = [];
  const routes = ApiRoutes({});
  const ids = await fetch(routes.categoriesIds);

  if (ids) {
    for (const { category_id: categoryId } of ids.data) {
      paths.push({ params: { categoryId } });
    }
  }

  return {
    paths: paths,
    fallback: true,
  };
}

export default CategoryPage;
