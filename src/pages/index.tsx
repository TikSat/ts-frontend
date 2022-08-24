import React from 'react';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { fetchApi } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { Main, MainPageProps } from '@core/components/pages/Main';

const HomePage: NextPage<MainPageProps> = (props) => {
  return <Main {...props} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let routes = ApiRoutes({});
  const categories = await fetchApi(routes.categories);
  const listings = await fetchApi(routes.recommended);
  const breadcrumbs = [{ title: 'Istanbul', url: '/', current: true }];

  if (!categories || !listings || !breadcrumbs) {
    res.statusCode = 500;
    throw new Error('Internal Server Error');
  } else {
    return { props: { categories, listings, breadcrumbs } };
  }
};

export default HomePage;
