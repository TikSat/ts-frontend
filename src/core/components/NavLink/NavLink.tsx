import * as React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import s from './NavLink.module.css';

interface LinkProps {
  children: React.ReactNode;

  className?: string;
  href: string;
  as?: string;
  theme?: 'primary' | 'secondary' | 'silent';
}

export const NavLink = ({ children, className, theme = 'primary', href, as }: LinkProps) => {
  return (
    <Link href={href} as={as}>
      <a className={cn(s.root, s[theme], className)}>{children}</a>
    </Link>
  );
};
