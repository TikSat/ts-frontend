import Image from 'next/image';
import { NavLink } from '@app/components/ui/NavLink';
import s from './Category.module.css';

export interface CategoryProps {
  id: string;
  name: string;
  slug: string;
  image_small: string;
  desc: string;
  listings_count: number;
}

export const Category = ({ name, slug, image_small, listings_count }: CategoryProps) => {
  const image_src = image_small ? image_small : '/img.png';

  const listingName = !!listings_count ? (
    <span className={s.title}>{name}</span>
  ) : (
    <span className={s.title}>{name}</span>
  );
  return (
    <div className={s.root}>
      <NavLink href={slug}>
        <div className={s.content}>
          <Image src={image_src} alt={name} width="56" height="56" layout="fixed"></Image>
          {listingName}
        </div>
      </NavLink>
    </div>
  );
};
