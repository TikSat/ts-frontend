import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { NextPageWithLayout } from 'src/pages/_app';
import { ApiRoutes } from '@app/routes';
import { ListingProps } from '@app/components/models/Listing';
import { CategoryProps } from '@app/components/models/Category';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { Main } from '@app/components/pages/Main';
import { buildBreadcrumbs } from 'src/lib/api/breadcrumbs';

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

  let breadcrumbs = await buildBreadcrumbs(params?.categoryId);

  if (categoryData?.status == 200 && listingsData?.status == 200) {
    return {
      props: {
        listings: listingsData?.data || [],
        categories: categories || [],
        category: category || [],
        breadcrumbs: breadcrumbs,
      },
      revalidate: 30,
    };
  } else {
    return {
      props: {
        listings: [],
        categories: [],
        category: [],
        breadcrumbs: [],
      },
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
