import React from 'react';
import Image from 'next/image';
import { NavLink } from '@app/components/ui/NavLink';
import { ListingProps } from '@app/components/models/Listing';
import image from '/public/img_1.png';
import s from './ListingRow.module.css';

export const ListingRow = ({ category, slug, title, image_extra_small }: ListingProps) => {
  const image_src = image_extra_small ? image_extra_small : image.src;
  return (
    <NavLink href={`${category?.slug}/${slug}`}>
      <div className={s.root}>
        <div className={s.image}>
          <Image src={image_src} layout="fill" alt={title}></Image>
        </div>
        <div className={s.text}>
          <span className={s.title}>{title}</span>
          <span className={s.price}>$100 000</span>
          <span className={s.location}>Moscow, Arbat street</span>
        </div>
      </div>
    </NavLink>
  );
};
