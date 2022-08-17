import Image from 'next/image';
import { Link } from '@core/components/Link';
import { CategoryProps } from '@core/components/Category/Category';
import s from './ListingPreview.module.css';

export interface ListingProps {
  id: string;
  title: string;
  slug: string;
  category: CategoryProps;
}

export const ListingPreview = (listing: ListingProps) => {
  return (
    <Link href={`${listing.category.id}/${listing.id}`}>
      <div className={s.root}>
        <div className={s.image}>
          <Image src="/img_1.png" width="218" height="164" layout="fixed"></Image>
        </div>
        <div className={s.text}>
          <span className={s.price}>$100 000</span>
          <span className={s.title}>{listing.title}</span>
          <span className={s.location}>Moscow, Tchaikovskogo street</span>
        </div>
      </div>
    </Link>
  );
};
