import s from './Category.module.css';
import { Link } from '../Link';
import Image from 'next/image';

export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  image_small: string;
}

export const Category = (category: CategoryType) => {
  return (
    <div className={s.root}>
      <Link href={category.slug}>
        <div className={s.content}>
          <Image src="/img.png" alt={category.name} width="56" height="56" layout="fixed"></Image>
          <span className={s.title}>{category.name}</span>
        </div>
      </Link>
    </div>
  );
};