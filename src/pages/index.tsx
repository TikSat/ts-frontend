import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { CategoryList } from '@core/components/CategoryList';
import React from 'react';
import { ListingList } from '@core/components/ListingList';
import { CategoryProps } from '@core/components/Category/Category';
import { ListingProps } from '@core/components/Listing/Listing';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';

export interface HomePage {
  categories: CategoryProps[];
  listings: ListingProps[];
}

const Home: NextPage<HomePage> = ({ categories, listings }) => {
  return (
    <React.Fragment>
      <CategoryList categories={categories}></CategoryList>
      <ListingList listings={listings}></ListingList>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let routes = ApiRoutes(params);
  const categories = await fetchApi(routes.categories);
  const listings = await fetchApi(routes.recommended);

  return { props: { categories, listings } };
};

export default Home;
