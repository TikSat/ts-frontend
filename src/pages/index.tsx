import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { CategoryList } from '@core/components/CategoryList';
import React from 'react';
import { ListingList } from '@core/components/ListingList';
import { CategoryProps } from '@core/components/Category/Category';
import { ListingProps } from '@core/components/Listing/Listing';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';
import { ListingsContainer } from '@core/components/ListingsContainer';
import { Sidebar } from '@core/components/Sidebar';
import { FavoritesListPreview } from '@core/components/FavoritesListPreview';

import s from '/src/styles/HomePage.module.css';

export interface HomePage {
  categories: CategoryProps[];
  listings: ListingProps[];
}

const Home: NextPage<HomePage> = ({ categories, listings }) => {
  return (
    <React.Fragment>
      <CategoryList categories={categories}></CategoryList>
      <div className={s.root}>
        <ListingsContainer>
          <h2 className={s.header}>Your recommendations</h2>
          <ListingList listings={listings}></ListingList>
        </ListingsContainer>
        <Sidebar>
          <FavoritesListPreview listings={listings}></FavoritesListPreview>
        </Sidebar>
      </div>
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
