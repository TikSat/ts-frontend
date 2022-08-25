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
  const category = await fetch(routes.category);
  const listings = await fetch(routes.listings);
  const categories = category.subcategories;
  let parentCategory = null;

  if (category.parent_id) {
    parentCategory = await fetch(ApiRoutes({ categoryId: category.parent_id }).category);
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
      title: category.name,
      url: `/${category.id}`,
      current: true,
    },
  ];

  return { props: { listings, categories, category, breadcrumbs }, revalidate: 30 };
};

export async function getStaticPaths() {
  const routes = ApiRoutes({});
  const ids = await fetch(routes.categories, {
    params: {
      response: { include: ['id'] },
      pagination: false,
    },
  });

  const paths = ids.map(({ id }: CategoryProps) => {
    return { params: { categoryId: id } };
  });
  return {
    paths: paths,
    fallback: true,
  };
}

export default CategoryPage;
