import { Category } from '@core/components/Category';
import type { CategoryType } from '@core/components/Category/Category';
import s from './CategoryList.module.css';

export type CategoryListType = {
  categories: CategoryType[];
};

export const CategoryList = ({ categories }: CategoryListType) => {
  return (
    <div className={s.root}>
      {categories?.map((category: CategoryType) => (
        <Category key={`${category.id}`} {...category}></Category>
      ))}
    </div>
  );
};
