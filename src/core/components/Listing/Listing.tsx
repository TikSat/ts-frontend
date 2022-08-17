import React from 'react';

export interface ListingProps {
  title: string;
}

export const Listing = ({ ...data }: ListingProps) => {
  return (
    <React.Fragment>
      <h1>{data.title}</h1>
    </React.Fragment>
  );
};
