import Image from 'next/image';
import { NavLink } from '@core/components/NavLink';
import { ListingProps } from '@core/components/Listing/Listing';
import { Icon } from '@core/components/Icon';
import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import image from '/public/img_1.png';
import s from './ListingCardPreview.module.css';

export const ListingCardPreview = (listing: ListingProps) => {
  const { category, id, title, url = '/' } = listing;
  const path = category ? `${category.id}/${id}` : url;

  return (
    <NavLink href={path}>
      <div className={cn(s.root)}>
        <div className={s.image}>
          <Image src={image.src} layout="fill"></Image>
        </div>
        <React.Fragment>
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
        </React.Fragment>
      </div>
    </NavLink>
  );
};
