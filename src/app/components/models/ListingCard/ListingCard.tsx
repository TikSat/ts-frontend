import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import image from '/public/img_1.png';
import { ListingProps } from '@app/components/models/Listing';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import s from './ListingCard.module.css';
import { format } from 'src/lib/api/currencyFormatter';

export const ListingCard = (listing: ListingProps) => {
  const { category, title, url = '/', slug, image_medium, price } = listing;
  const path = category ? `${category.slug}/${slug}` : url;
  const image_src = image_medium ? image_medium : image.src;
  return (
    <NavLink href={path}>
      <div className={cn(s.root)}>
        <div className={s.image}>
          <Image src={image_src} layout="fill" alt={listing.title} priority={true}></Image>
        </div>
        <Link href={'/'}>
          <div className={s.favorite}>
            <Icon name={'heart'} size={'xs'} />
          </div>
        </Link>
        <div className={s.text}>
          <span className={s.price}>{format('tr-TR', 'TRY', price || 0)}</span>
          <span className={s.title}>{title}</span>
          <span className={s.location}>Moscow, Arbat street</span>
        </div>
      </div>
    </NavLink>
  );
};
