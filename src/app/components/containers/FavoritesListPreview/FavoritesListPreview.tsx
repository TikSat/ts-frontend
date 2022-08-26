import * as React from 'react';
import { ListingListProps } from '@app/components/containers/ListingList';
import { Button } from '@app/components/ui/Button';
import { ListingRow } from '@app/components/models/ListingRow';
import s from './FavoritesListPreview.module.css';

export const FavoritesListPreview = ({ listings }: ListingListProps) => {
  let arr = listings.slice(0, 4);
  return (
    <div className={s.root}>
      <h2 className={s.header}>Favorite</h2>
      {arr?.map((listing) => (
        <ListingRow key={`${listing.id}`} {...listing}></ListingRow>
      ))}
      <Button theme={'silent'} className={'fullWidth'}>
        See all
      </Button>
    </div>
  );
};
