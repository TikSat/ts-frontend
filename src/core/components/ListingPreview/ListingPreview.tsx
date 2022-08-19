import Image from 'next/image';
import { NavLink } from '@core/components/NavLink';
import s from './ListingPreview.module.css';
import { ListingProps } from '@core/components/Listing/Listing';

export const ListingPreview = ({ category, id, title }: ListingProps) => {
  return (
    <NavLink href={`${category.id}/${id}`}>
      <div className={s.root}>
        <div className={s.image}>
          <Image src="/img_1.png" width="218" height="164" layout="fixed"></Image>
        </div>
        <div className={s.text}>
          <span className={s.price}>$100 000</span>
          <span className={s.title}>{title}</span>
          <span className={s.location}>Moscow, Tchaikovskogo street</span>
        </div>
      </div>
    </NavLink>
  );
};
