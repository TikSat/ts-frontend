import * as React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import s from './NavLink.module.css';

interface LinkProps {
  children: React.ReactNode;
  withIcon?: boolean;
  className?: string;
  href: string;
  as?: string;
  theme?: 'primary' | 'secondary' | 'silent';
  props?: {};
}

export const NavLink = ({
  children,
  className,
  withIcon = false,
  theme = 'primary',
  href,
  as,
  props = {},
}: LinkProps) => {
  const icon = withIcon ? s.withIcon : s.withoutIcon;

  return (
    <Link href={href} as={as}>
      <a className={cn(s.root, s[theme], className, icon)} {...props}>
        {children}
      </a>
    </Link>
  );
};
