import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import image from '/public/img_1.png';
import { ListingProps } from '@app/components/models/Listing';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import s from './ListingCard.module.css';
import { serverUrl } from 'src/lib/api/fetcher';

export const ListingCard = (listing: ListingProps) => {
  const { category, title, url = '/', slug, image_url, price } = listing;
  const path = category ? `${category.slug}/${slug}` : url;
  const image_src = !!image_url ? serverUrl + image_url : image.src;

  return (
    <NavLink href={path}>
      <div className={cn(s.root)}>
        <div className={s.image}>
          <Image src={image_src} layout="fill" alt={listing.title}></Image>
        </div>
        <Link href={'/'}>
          <div className={s.favorite}>
            <Icon name={'heart'} size={'xs'} />
          </div>
        </Link>
        <div className={s.text}>
          <span className={s.price}>{price}</span>
          <span className={s.title}>{title}</span>
          <span className={s.location}>Moscow, Arbat street</span>
        </div>
      </div>
    </NavLink>
  );
};
