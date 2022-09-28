import Image from 'next/image';
import React from 'react';
import image from '/public/img_1.png';
import { ListingProps } from '@app/components/models/Listing';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import { format } from 'src/lib/api/currencyFormatter';
import s from './ListingCard.module.scss';

export const ListingCard = (listing: ListingProps) => {
  const { category, title, url = '/', slug, image_medium, price } = listing;
  const path = category ? `${category.slug}/${slug}` : url;
  const image_src = image_medium ? image_medium : image.src;
  return (
    <div className={s.root}>
      <NavLink href={path}>
        <div className={s.image}>
          <Image
            src={image_src}
            layout={'responsive'}
            width={320}
            height={240}
            alt={listing.title}
            priority={true}
          ></Image>
        </div>

        <div className={s.text}>
          <span className={s.price}>{format('tr-TR', 'TRY', price || 0)}</span>
          <span className={s.title}>{title}</span>
          <span className={s.location}>Moscow, Arbat street</span>
        </div>
      </NavLink>
      <div className={s.favorite}>
        <NavLink href={'/favorites'} authRequired>
          <Icon name={'heart'} size={'xs'} />
        </NavLink>
      </div>
    </div>
  );
};
