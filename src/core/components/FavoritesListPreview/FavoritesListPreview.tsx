import * as React from 'react';
import { ListingProps } from '@core/components/Listing/Listing';
import { ListingRowPreview } from '@core/components/ListingRowPreview';
import { Button } from '@core/components/Button';
import s from './FavoritesListPreview.module.css';

export interface ListingListProps {
  listings: ListingProps[];
}

export const FavoritesListPreview = ({ listings }: ListingListProps) => {
  let arr = listings.slice(0, 4);
  return (
    <div className={s.root}>
      <h2 className={s.header}>Favorite</h2>
      {arr?.map((listing) => (
        <ListingRowPreview key={`${listing.id}`} {...listing}></ListingRowPreview>
      ))}
      <Button theme={'silent'} className={s.button}>
        See all
      </Button>
    </div>
  );
};
