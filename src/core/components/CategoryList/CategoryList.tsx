import { Category } from '@core/components/Category';
import type { CategoryType } from '@core/components/Category/Category';
import s from './CategoryList.module.css';

export const CategoryList = ({ categories }) => {
  return (
    <div className={s.root}>
      {categories &&
        categories.map((category: CategoryType) => {
          return <Category key={`${category.id}`} {...category}></Category>;
        })}
    </div>
  );
};
