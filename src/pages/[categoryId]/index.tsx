import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { ListingList } from '@core/components/ListingList';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';
import { ListingProps } from '@core/components/Listing/Listing';
import { CategoryList } from '@core/components/CategoryList';
import { ListingsContainer } from '@core/components/ListingsContainer';
import { Sidebar } from '@core/components/Sidebar';
import { FavoritesListPreview } from '@core/components/FavoritesListPreview';
import { CategoryProps } from '@core/components/Category/Category';
import { BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import { BreadcrumbList } from '@core/components/BreadcrumbList';
import s from '/src/styles/HomePage.module.css';

interface CategoryPageProps {
  listings: ListingProps[];
  categories: CategoryProps[];
  category: CategoryProps;
  breadcrumbs: BreadcrumbProps[];
}

const CategoryPage: NextPage<CategoryPageProps> = ({
  listings,
  categories,
  category,
  breadcrumbs,
}) => {
  return (
    <React.Fragment>
      <CategoryList categories={categories}></CategoryList>
      <div className={s.root}>
        <ListingsContainer>
          <BreadcrumbList breadcrumbs={breadcrumbs} />
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
  const routes = ApiRoutes({ categoryId: params?.categoryId });
  const category = await fetchApi(routes.category);
  const listings = await fetchApi(routes.listings);
  const categories = category.subcategories;
  let parentCategory = null;

  if (category.parent_id) {
    parentCategory = await fetchApi(ApiRoutes({ categoryId: category.parent_id }).category);
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
      current: true,
    },
  ];

  return { props: { listings, categories, category, breadcrumbs } };
};

export default CategoryPage;
