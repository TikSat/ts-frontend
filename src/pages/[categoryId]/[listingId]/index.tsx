import React from 'react';
import { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { NextPageWithLayout } from 'src/pages/_app';
import { Listing, ListingProps } from '@app/components/models/Listing';
import { CategoryProps } from '@app/components/models/Category';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { ApiRoutes } from '@app/routes';
import { buildBreadcrumbs } from 'src/lib/api/breadcrumbs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ListingPageProps {
  listing: ListingProps;
  category: CategoryProps;
  breadcrumbs: BreadcrumbProps[];
}

const ListingPage: NextPageWithLayout<ListingPageProps> = (props) => {
  return <Listing {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const routes = ApiRoutes({ categoryId: params?.categoryId, listingId: params?.listingId });

  const listingData = await fetch(routes.listing);
  const categoryData = await fetch(routes.category);

  if (listingData?.status == 200 && categoryData?.status == 200) {
    const category = categoryData?.data;
    const listing = listingData?.data;
    const breadcrumbs = await buildBreadcrumbs({
      categoryId: params?.categoryId,
      listing: listing,
    });

    return {
      props: {
        listing,
        category,
        breadcrumbs,
        ...(await serverSideTranslations(locale as string)),
      },
      revalidate: 60,
    };
  } else {
    return {
      props: {
        listing: [],
        category: null,
        breadcrumbs: [],
        ...(await serverSideTranslations(locale as string)),
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
