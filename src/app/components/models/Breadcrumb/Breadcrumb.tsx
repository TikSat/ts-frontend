import cn from 'classnames';
import { NavLink } from '@app/components/ui/NavLink';
import s from './Breadcrumb.module.css';

export interface BreadcrumbProps {
  title: string;
  url: string;
  current: boolean;
  position: string;
}
export const Breadcrumb = ({ title, url, current = false, position }: BreadcrumbProps) => {
  const klass: 'current' | 'link' = current ? 'current' : 'link';
  let path;
  if (current) {
    path = (
      <span>
        <span className={cn(s.navigationItem, s[klass])}>{title}</span>
      </span>
    );
  } else {
    path = (
      <NavLink href={url}>
        <span className={cn(s.navigationItem, s[klass])}>{title}</span>
      </NavLink>
    );
  }

  return path;
};
