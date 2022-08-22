import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Listing } from '@core/components/Listing';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';
import { CategoryProps } from '@core/components/Category/Category';
import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import { BreadcrumbList } from '@core/components/BreadcrumbList';

interface ListingPageProps {
  listing: ListingProps;
  category: CategoryProps;
  breadcrumbs: BreadcrumbProps[];
}

const ListingPage: NextPage<ListingPageProps> = ({ listing, category, breadcrumbs }) => {
  return (
    <React.Fragment>
      <BreadcrumbList breadcrumbs={breadcrumbs} />
      <Listing {...listing}></Listing>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const routes = ApiRoutes({ categoryId: params?.categoryId, listingId: params?.listingId });
  const listing = await fetchApi(routes.listing);
  const category = await fetchApi(routes.category);
  let parentCategory = null;
  // TODO: create category tree endpoint on backend
  if (category.parent_id) {
    parentCategory = await fetchApi(ApiRoutes({ categoryId: category.parent_id }).category);
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
      current: false,
    },
    {
      title: listing.title,
      url: `/${category.id}/${listing.id}`,
      current: true,
    },
  ];

  return { props: { listing, category, breadcrumbs } };
};

export default ListingPage;
