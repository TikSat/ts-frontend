import * as React from 'react';
import cn from 'classnames';
import * as NextLink from 'next/link';

import s from './Link.module.css';

interface LinkProps {
  children: React.ReactNode;

  className?: string;
  href?: string;
  theme?: 'primary' | 'secondary' | 'silent';
}

export const Link = ({ children, className, theme = 'primary', href }: LinkProps) => {
  return (
    <NextLink href={href}>
      <a className={cn(s.root, s[theme], className)}>{children}</a>
    </NextLink>
  );
};
