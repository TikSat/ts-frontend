import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import image from '/public/img_1.png';
import { ListingProps } from '@app/components/models/Listing';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import s from './ListingCard.module.css';

export const ListingCard = (listing: ListingProps) => {
  const { category, id, title, url = '/' } = listing;
  const path = category ? `${category.id}/${id}` : url;

  return (
    <NavLink href={path}>
      <div className={cn(s.root)}>
        <div className={s.image}>
          <Image src={image.src} layout="fill"></Image>
        </div>
        <Link href={'/'}>
          <div className={s.favorite}>
            <Icon name={'heart'} size={'xs'} />
          </div>
        </Link>
        <div className={s.text}>
          <span className={s.price}>$100 000</span>
          <span className={s.title}>{title}</span>
          <span className={s.location}>Moscow, Arbat street</span>
        </div>
      </div>
    </NavLink>
  );
};
