import React from 'react';
import { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { NextPageWithLayout } from 'src/pages/_app';
import { Listing, ListingProps } from '@app/components/models/Listing';
import { CategoryProps } from '@app/components/models/Category';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { ApiRoutes } from '@app/routes';
import { buildBreadcrumbs } from 'src/lib/api/breadcrumbs';

interface ListingPageProps {
  listing: ListingProps;
  category: CategoryProps;
  breadcrumbs: BreadcrumbProps[];
}

const ListingPage: NextPageWithLayout<ListingPageProps> = ({ listing, breadcrumbs }) => {
  return <Listing breadcrumbs={breadcrumbs} listing={listing} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const routes = ApiRoutes({ categoryId: params?.categoryId, listingId: params?.listingId });

  const listingData = await fetch(routes.listing);
  const categoryData = await fetch(routes.category);
  const category = categoryData?.data;
  const listing = listingData?.data;

  let breadcrumbs = await buildBreadcrumbs(params?.categoryId, true);

  breadcrumbs.push({
    title: listing.title,
    url: `/${category?.slug}/${listing?.slug}`,
    current: true,
  });

  if (listingData?.status == 200 && categoryData?.status == 200) {
    return {
      props: {
        listing: listing || null,
        category: category || null,
        breadcrumbs: breadcrumbs,
      },
      revalidate: 60,
    };
  } else {
    return {
      props: {
        listing: [],
        category: null,
        breadcrumbs: [],
      },
      revalidate: 60,
    };
  }
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default ListingPage;
