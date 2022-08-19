import React from 'react';
import { CategoryProps } from '@core/components/Category/Category';

export interface ListingProps {
  id: string;
  title: string;
  slug: string;
  category: CategoryProps;
}

export const Listing = ({ title }: ListingProps) => {
  return (
    <React.Fragment>
      <h1>{title}</h1>
    </React.Fragment>
  );
};
