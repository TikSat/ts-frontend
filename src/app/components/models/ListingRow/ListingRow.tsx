import React from 'react';
import Image from 'next/image';
import { NavLink } from '@app/components/ui/NavLink';
import { ListingProps } from '@app/components/models/Listing';
import s from './ListingRow.module.css';
import { serverUrl } from 'src/lib/api/fetcher';
import image from '/public/img_1.png';

export const ListingRow = ({ category, slug, title, image_url }: ListingProps) => {
  const image_src = !!image_url ? serverUrl + image_url : image.src;
  return (
    <NavLink href={`${category?.slug}/${slug}`}>
      <div className={s.root}>
        <div className={image_src}>
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
