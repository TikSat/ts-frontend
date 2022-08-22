import { Breadcrumb, BreadcrumbProps } from '@core/components/Breadcrumb/Breadcrumb';
import s from './BreadcrumbList.module.css';

interface BreadcrumbListProps {
  breadcrumbs: BreadcrumbProps[];
}

export const BreadcrumbList = ({ breadcrumbs }: BreadcrumbListProps) => {
  return (
    <ol className={s.root} itemScope itemType="https://schema.org/BreadcrumbList">
      {breadcrumbs
        .filter((el) => el.title != null)
        .map((breadcrumb, index) => {
          breadcrumb.position = (index + 1).toString();
          return <Breadcrumb key={index} {...breadcrumb} />;
        })}
    </ol>
  );
};
