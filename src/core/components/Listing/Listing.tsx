import React from 'react';

export interface ListingProps {
  title: string;
}

export const Listing = ({ title }: ListingProps) => {
  return (
    <React.Fragment>
      <h1>{title}</h1>
    </React.Fragment>
  );
};
