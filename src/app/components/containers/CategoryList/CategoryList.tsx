import { Category, CategoryProps } from '@app/components/models/Category';
import s from './CategoryList.module.css';

export interface CategoryListType {
  categories: CategoryProps[];
}

export const CategoryList = ({ categories }: CategoryListType) => {
  return (
    <div className={s.root}>
      {categories.map((category: CategoryProps) => (
        <Category key={`${category.id}`} {...category}></Category>
      ))}
    </div>
  );
};
