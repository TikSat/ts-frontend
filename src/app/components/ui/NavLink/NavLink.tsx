import * as React from 'react';
import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import { BaseSyntheticEvent } from 'react';
import { SignIn } from '@app/components/pages/SignIn';
import { useActions } from '@app/hooks/useActions';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import s from './NavLink.module.css';

export type NavLinkProps = LinkProps & {
  children: React.ReactNode;
  withIcon?: boolean;
  className?: string;
  theme?: 'primary' | 'secondary' | 'silent' | 'white';
  authRequired?: boolean;
};

export const NavLink = ({
  children,
  onClick,
  className,
  withIcon = false,
  theme = 'primary',
  href,
  as,
  authRequired = false,
  ...rest
}: NavLinkProps) => {
  const icon = withIcon ? s.withIcon : s.withoutIcon;
  const { setModal } = useActions();
  const { user } = useTypedSelectors((state) => state.user);

  authRequired = !user && authRequired;

  const showModal = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setModal({ name: 'SignIn' });
  };

  return (
    <Link href={href} as={as} {...rest} passHref>
      <a
        className={cn(s.root, s[theme], className, icon)}
        onClick={authRequired ? showModal : onClick}
      >
        {children}
      </a>
    </Link>
  );
};
