import { Category } from '@core/components/Category';
import type { CategoryProps } from '@core/components/Category/Category';
import s from './CategoryList.module.css';

export interface CategoryListProps {
  categories: CategoryProps[];
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className={s.root}>
      {categories?.map((category: CategoryProps) => (
        <Category key={`${category.id}`} {...category}></Category>
      ))}
    </div>
  );
};
