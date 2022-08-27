import React from 'react';
import { GetStaticProps } from 'next';
import { fetch } from 'src/lib/api/fetcher';
import { NextPageWithLayout } from 'src/pages/_app';
import { Listing, ListingProps } from '@app/components/models/Listing';
import { CategoryProps } from '@app/components/models/Category';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { BreadcrumbList } from '@app/components/containers/BreadcrumbList';
import { ApiRoutes } from '@app/routes';

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
    const parentCategoryData = await fetch(
      ApiRoutes({ categoryId: category.parent_slug }).category
    );
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
      url: parentCategory ? `/${parentCategory.slug}` : null,
      current: false,
    },
    {
      title: category?.name || null,
      url: `/${category?.slug}`,
      current: false,
    },
    {
      title: listing?.title || null,
      url: `/${category?.id}/${listing?.slug}`,
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
