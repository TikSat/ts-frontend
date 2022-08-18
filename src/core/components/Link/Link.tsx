import * as React from 'react';
import cn from 'classnames';
import { default as NextLink } from 'next/link';

import s from './Link.module.css';

interface LinkProps {
  children: React.ReactNode;

  className?: string;
  href: string;
  as?: string;
  theme?: 'primary' | 'secondary' | 'silent';
}

export const Link = ({ children, className, theme = 'primary', href, as }: LinkProps) => {
  return (
    <NextLink href={href} as={as}>
      <a className={cn(s.root, s[theme], className)}>{children}</a>
    </NextLink>
  );
};
