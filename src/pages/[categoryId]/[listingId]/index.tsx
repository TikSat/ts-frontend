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
  const listing = await fetch(routes.listing);
  const category = await fetch(routes.category);
  let parentCategory = null;
  // TODO: create category tree endpoint on backend
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
      current: false,
    },
    {
      title: listing.title,
      url: `/${category.id}/${listing.id}`,
      current: true,
    },
  ];

  return { props: { listing, category, breadcrumbs }, revalidate: 30 };
};

export async function getStaticPaths() {
  let routes = ApiRoutes({});
  const categoryIds = await fetch(routes.categories, {
    params: {
      response: { include: ['id'] },
      pagination: false,
    },
  });

  const buildPaths = async () => {
    const paths: { params: { categoryId: string; listingId: string } }[] = [];

    for (const { id: categoryId } of categoryIds) {
      let routes = ApiRoutes({ categoryId });

      const listingIds = await fetch(routes.listings, {
        params: {
          pagination: false,
          response: {
            include: ['id'],
          },
        },
      });

      for (const { id: listingId } of listingIds) {
        paths.push({ params: { categoryId, listingId } });
      }
    }

    return paths;
  };

  return {
    paths: await buildPaths(),
    fallback: true,
  };
}

export default ListingPage;
