import * as React from 'react';
import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import s from './NavLink.module.css';

// interface LinkProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   withIcon?: boolean;
//   className?: string;
//   href: string;
//   as?: string;
//   theme?: 'primary' | 'secondary' | 'silent';
//   props?: {};
// }

export type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  withIcon?: boolean;
  className?: string;
  theme?: 'primary' | 'secondary' | 'silent';
};

export const NavLink = ({
  children,
  onClick,
  className,
  withIcon = false,
  theme = 'primary',
  href,
  as,
  ...rest
}: NavLinkProps) => {
  const icon = withIcon ? s.withIcon : s.withoutIcon;

  return (
    <Link href={href} as={as} {...rest}>
      <a className={cn(s.root, s[theme], className, icon)} onClick={onClick}>
        {children}
      </a>
    </Link>
  );
};
