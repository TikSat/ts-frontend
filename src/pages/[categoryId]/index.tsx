import { GetServerSideProps, NextPage } from 'next';
import { ListingList } from '@core/components/ListingList';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';
import { CategoryList } from '@core/components/CategoryList';
import { ListingsContainer } from '@core/components/ListingsContainer';
import { Sidebar } from '@core/components/Sidebar';
import { FavoritesListPreview } from '@core/components/FavoritesListPreview';
import React from 'react';
import { CategoryProps } from '@core/components/Category/Category';
import s from '/src/styles/HomePage.module.css';

interface CategoryPageProps {
  listings: ListingProps[];
  categories: CategoryProps[];
  category: CategoryProps;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ listings, categories, category }) => {
  return (
    <React.Fragment>
      <CategoryList categories={categories}></CategoryList>
      <div className={s.root}>
        <ListingsContainer>
          <h2 className={s.header}>{category.name}</h2>
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
  const category = await fetchApi(ApiRoutes(params).category);
  const listings = await fetchApi(ApiRoutes(params).listings);
  const categories = await fetchApi(ApiRoutes(params).subcategories);
  return { props: { listings, categories, category } };
};

export default CategoryPage;
