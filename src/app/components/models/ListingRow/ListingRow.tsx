import React from 'react';
import Image from 'next/image';
import { NavLink } from '@app/components/ui/NavLink';
import { ListingProps } from '@app/components/models/Listing';
import s from './ListingRow.module.css';

export const ListingRow = ({ category, id, title }: ListingProps) => {
  return (
    <NavLink href={`${category?.id}/${id}`}>
      <div className={s.root}>
        <div className={s.image}>
          <Image src="/img_1.png" layout="fill"></Image>
        </div>
        <div className={s.text}>
          <span className={s.title}>{title}</span>
          <span className={s.price}>$100 000</span>
          <span className={s.location}>Moscow, Tchaikovskogo street</span>
        </div>
      </div>
    </NavLink>
  );
};
