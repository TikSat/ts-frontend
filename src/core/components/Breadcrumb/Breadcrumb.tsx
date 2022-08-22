import { NavLink } from '@core/components/NavLink';
import s from './Breadcrumb.module.css';
import { serverUrl } from '@core/routes';
import cn from 'classnames';

export interface BreadcrumbProps {
  title: string;
  url: string;
  current: boolean;
  position: string;
}
export const Breadcrumb = ({ title, url, current = false, position }: BreadcrumbProps) => {
  const klass = current ? 'current' : 'link';
  let path;
  if (current) {
    path = (
      // @ts-ignore
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
