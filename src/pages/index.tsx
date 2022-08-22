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
import { BreadcrumbList } from '@core/components/BreadcrumbList';
import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import Head from 'next/head';
import s from '/src/styles/HomePage.module.css';

export interface HomePage {
  categories: CategoryProps[];
  listings: ListingProps[];
  breadcrumbs: BreadcrumbProps[];
}

const Home: NextPage<HomePage> = ({ categories, listings, breadcrumbs }) => {
  return (
    <React.Fragment>
      {/*Injects to head*/}
      <Head>
        <title>Home | Istanbul</title>
      </Head>

      <CategoryList categories={categories}></CategoryList>
      <div className={s.root}>
        <ListingsContainer>
          <BreadcrumbList breadcrumbs={breadcrumbs} />
          <h1 className={s.header}>Your recommendations</h1>
          <ListingList listings={listings}></ListingList>
        </ListingsContainer>
        <Sidebar>
          <FavoritesListPreview listings={listings}></FavoritesListPreview>
        </Sidebar>
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let routes = ApiRoutes({});
  const categories = await fetchApi(routes.categories);
  const listings = await fetchApi(routes.recommended);
  const breadcrumbs = [{ title: 'Istanbul', url: '/', current: true }];

  return { props: { categories, listings, breadcrumbs } };
};

export default Home;
