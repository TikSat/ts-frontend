import Image from 'next/image';
import { NavLink } from '@core/components/NavLink';
import { ListingProps } from '@core/components/Listing/Listing';
import { Icon } from '@core/components/Icon';
import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import s from './ListingCardPreview.module.css';

export const ListingCardPreview = ({ category, id, title, url = '/', slug }: ListingProps) => {
  const isAd = slug === 'ad';
  const path = category ? `${category.id}/${id}` : url;
  const image = isAd ? '/ad.png' : '/img_1.png';

  return (
    <NavLink href={path}>
      <div className={cn(s.root)}>
        <div className={s.image}>
          <Image src={image} layout="fill"></Image>
        </div>
        {!isAd ? (
          <React.Fragment>
            <Link href={'/'}>
              <div className={s.favorite}>
                <Icon name={'heart'} size={'xs'} />
              </div>
            </Link>
            <div className={s.text}>
              <span className={s.price}>$100 000</span>
              <span className={s.title}>{title}</span>
              <span className={s.location}>Moscow, Tchaikovskogo street</span>
            </div>
          </React.Fragment>
        ) : (
          <div></div>
        )}
      </div>
    </NavLink>
  );
};
