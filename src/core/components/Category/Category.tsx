import s from './Category.module.css';
import { NavLink } from '../NavLink';
import Image from 'next/image';

export interface CategoryProps {
  id: string;
  name: string;
  slug: string;
  image_small: string;
}

export const Category = (category: CategoryProps) => {
  return (
    <div className={s.root}>
      <NavLink href={category.id}>
        <div className={s.content}>
          <Image src="/img.png" alt={category.name} width="56" height="56" layout="fixed"></Image>
          <span className={s.title}>{category.name}</span>
        </div>
      </NavLink>
    </div>
  );
};
