import React from 'react';
import { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { NextPageWithLayout } from 'src/pages/_app';
import { Listing, ListingProps } from '@app/components/models/Listing';
import { CategoryProps } from '@app/components/models/Category';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { BreadcrumbList } from '@app/components/containers/BreadcrumbList';
import { ApiRoutes } from '@app/routes';
import { buildBreadcrumbs } from 'src/lib/api/breadcrumbs';

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

  let breadcrumbs = await buildBreadcrumbs(listing.category.slug, true);

  breadcrumbs.push({
    title: listing.title,
    url: `/${category.slug}/${listing.slug}`,
    current: true,
  });

  return {
    props: {
      listing: listing || null,
      category: category || null,
      breadcrumbs: breadcrumbs,
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
