import React, { FC } from 'react';
import Head from 'next/head';
import { CategoryProps } from '@app/components/models/Category/Category';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { BreadcrumbProps } from '@app/components/models/Breadcrumb';
import { ListingProps } from '@app/components/models/Listing';
import { CategoryList } from '@app/components/containers/CategoryList';
import { ContainerWithSidebar } from '@app/components/containers/ContainerWithSidebar';
import { BreadcrumbList } from '@app/components/containers/BreadcrumbList';
import { ListingList } from '@app/components/containers/ListingList';
import { Sidebar } from '@app/components/containers/Sidebar';
import { FavoritesListPreview } from '@app/components/containers/FavoritesListPreview';

export type MainPageProps = {
  categories: CategoryProps[];
  listings: ListingProps[];
  breadcrumbs: BreadcrumbProps[];
  title: string;
  header: string;
  category?: CategoryProps;
};

export const Main: FC<MainPageProps> = ({
  categories,
  breadcrumbs,
  listings,
  title = 'Istanbul',
  header = 'Your Recommendations',
  category,
}) => {
  const { user } = useTypedSelectors((state) => state.user);

  const pageTitle = `${title} | Tiksat`;
  return (
    <React.Fragment>
      {/*Injects to head*/}
      <Head>
        <title>{pageTitle}</title>
        {category && category.desc && <meta name={'description'} content={category?.desc} />}
      </Head>
      <CategoryList categories={categories}></CategoryList>

      <ContainerWithSidebar>
        <div>
          <BreadcrumbList breadcrumbs={breadcrumbs} />
          <h1 className={'h1'}>{header}</h1>
          <ListingList listings={listings}></ListingList>
        </div>
        <Sidebar>
          {user && <FavoritesListPreview listings={listings}></FavoritesListPreview>}
        </Sidebar>
      </ContainerWithSidebar>
    </React.Fragment>
  );
};
