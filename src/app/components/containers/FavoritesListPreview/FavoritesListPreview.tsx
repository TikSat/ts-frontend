import * as React from 'react';
import { ListingListProps } from '@app/components/containers/ListingList';
import { Button } from '@app/components/ui/Button';
import { ListingRow } from '@app/components/models/ListingRow';
import { NavLink } from '@app/components/ui/NavLink';
import s from './FavoritesListPreview.module.css';
import b from '@app/components/ui/Button/Button.module.scss';

export const FavoritesListPreview = ({ listings }: ListingListProps) => {
  let arr = listings.slice(0, 4);
  return (
    <div className={s.root}>
      <h2 className={s.header}>Favorite</h2>
      {arr?.map((listing) => (
        <ListingRow key={`${listing.id}`} {...listing}></ListingRow>
      ))}
      <NavLink href={'/favorites'} className={s.button}>
        <Button theme={'silent'} className={b.w100}>
          See all
        </Button>
      </NavLink>
    </div>
  );
};
