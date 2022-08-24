import React, { FC } from 'react';
import Head from 'next/head';
import { CategoryList } from '@core/components/CategoryList';
import { ListingsContainer } from '@core/components/ListingsContainer';
import { BreadcrumbList } from '@core/components/BreadcrumbList';
import { ListingList } from '@core/components/ListingList';
import { Sidebar } from '@core/components/Sidebar';
import { FavoritesListPreview } from '@core/components/FavoritesListPreview';
import { CategoryProps } from '@core/components/Category/Category';
import { ListingProps } from '@core/components/Listing/Listing';
import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import s from './Main.module.css';

export type MainPageProps = {
  categories: CategoryProps[];
  listings: ListingProps[];
  breadcrumbs: BreadcrumbProps[];
};

export const Main: FC<MainPageProps> = ({ categories, breadcrumbs, listings }) => {
  return (
    <React.Fragment>
      {/*Injects to head*/}
      <Head>
        <title>Tiksat | Istanbul</title>
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
