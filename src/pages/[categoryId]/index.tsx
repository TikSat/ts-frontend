import React from 'react';
import { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { NextPageWithLayout } from 'src/pages/_app';
import { ApiRoutes } from '@app/routes';
import { CategoryProps } from '@app/components/models/Category';
import { Main, MainPageProps } from '@app/components/pages/Main';
import { buildBreadcrumbs } from 'src/lib/api/breadcrumbs';
import { ListingListProps } from '@app/components/containers/ListingList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type CategoryPageProps = MainPageProps & { category: CategoryProps };

const CategoryPage: NextPageWithLayout<CategoryPageProps> = (props) => {
  const { category } = props;
  return <Main {...props} title={category.name} header={category.name} />;
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const routes = ApiRoutes({ categoryId: params?.categoryId });
  const categoryData = await fetch(routes.category);
  const listingsData = await fetch(routes.listings, {
    params: {
      response: {
        include: ['id', 'title', 'price', 'slug', 'image_medium', 'image_extra_small', 'category'],
      },
    },
  });

  const category = categoryData?.data;
  const categories = category?.subcategories;

  let listingList: ListingListProps = {
    listings: [],
    currentPage: 1,
    totalPages: 1,
    apiUrl: routes.listings,
    url: `/${params?.categoryId}`,
  };
  listingList.listings = listingsData?.data;
  listingList.currentPage = parseInt(listingsData?.headers['current-page']);
  listingList.totalPages = parseInt(listingsData?.headers['total-pages']);

  let breadcrumbs = await buildBreadcrumbs({ categoryId: params?.categoryId });

  if (categoryData?.status == 200 && listingsData?.status == 200) {
    return {
      props: {
        listingList,
        categories,
        category,
        breadcrumbs,
        ...(await serverSideTranslations(locale as string)),
      },
      revalidate: 30,
    };
  } else {
    return {
      props: {
        listingList: [],
        categories: [],
        category: [],
        breadcrumbs: [],
        ...(await serverSideTranslations(locale as string)),
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
