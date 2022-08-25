import React from 'react';
import { GetStaticProps } from 'next';
import { Listing } from '@core/components/Listing';
import { fetch } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';
import { CategoryProps } from '@core/components/Category/Category';
import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import { BreadcrumbList } from '@core/components/BreadcrumbList';
import { NextPageWithLayout } from 'src/pages/_app';

interface ListingPageProps {
  listing: ListingProps;
  category: CategoryProps;
  breadcrumbs: BreadcrumbProps[];
}

const ListingPage: NextPageWithLayout<ListingPageProps> = ({ listing, breadcrumbs }) => {
  return (
    <React.Fragment>
      <BreadcrumbList breadcrumbs={breadcrumbs} />
      <Listing {...listing}></Listing>
    </React.Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const routes = ApiRoutes({ categoryId: params?.categoryId, listingId: params?.listingId });

  const listingData = await fetch(routes.listing);
  const categoryData = await fetch(routes.category);
  const category = categoryData?.data;
  const listing = listingData?.data;

  let parentCategory = null;
  // TODO: create category tree endpoint on backend
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
      current: false,
    },
    {
      title: listing?.title || null,
      url: `/${category?.id}/${listing?.id}`,
      current: true,
    },
  ];

  return {
    props: {
      listing: listing || null,
      category: category || null,
      breadcrumbs: breadcrumbs || null,
    },
    revalidate: 30,
  };
};

export async function getStaticPaths() {
  let routes = ApiRoutes({});
  const categoryIds = await fetch(routes.categoriesIds);
  const paths: { params: { categoryId: any; listingId: any } }[] = [];

  if (categoryIds) {
    for (const { category_id: categoryId, listings_ids: listingIds } of categoryIds.data) {
      for (const listingId of listingIds) {
        paths.push({ params: { categoryId, listingId } });
      }
    }
  }

  return {
    paths: paths,
    fallback: true,
  };
}

export default ListingPage;
