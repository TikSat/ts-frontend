import React, { FC } from 'react';
import Head from 'next/head';
import { CategoryList } from '@core/components/CategoryList';
import { ContainerWithSidebar } from '@core/components/ListingsContainer';
import { BreadcrumbList } from '@core/components/BreadcrumbList';
import { ListingList } from '@core/components/ListingList';
import { Sidebar } from '@core/components/Sidebar';
import { FavoritesListPreview } from '@core/components/FavoritesListPreview';
import { CategoryProps } from '@core/components/Category/Category';
import { ListingProps } from '@core/components/Listing/Listing';
import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import { useTypedSelectors } from '@core/hooks/useTypedSelectors';

export type MainPageProps = {
  categories: CategoryProps[];
  listings: ListingProps[];
  breadcrumbs: BreadcrumbProps[];
  title: string;
  header: string;
};

export const Main: FC<MainPageProps> = (pageProps) => {
  const {
    categories,
    breadcrumbs,
    listings,
    title = 'Istanbul',
    header = 'Your Recommendations',
  } = pageProps;
  const { user } = useTypedSelectors((state) => state.user);

  const pageTitle = `${title} | Tiksat`;
  return (
    <React.Fragment>
      {/*Injects to head*/}
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <CategoryList categories={categories}></CategoryList>

      <ContainerWithSidebar>
        <div>
          <BreadcrumbList breadcrumbs={breadcrumbs} />
          <h1 className={'h1'}>{header}</h1>
          <ListingList listings={listings}></ListingList>
        </div>
        <Sidebar>
          {user ? <FavoritesListPreview listings={listings}></FavoritesListPreview> : <div></div>}
        </Sidebar>
      </ContainerWithSidebar>
    </React.Fragment>
  );
};
