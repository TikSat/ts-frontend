import * as React from 'react';
import { useEffect } from 'react';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { useActions } from '@app/hooks/useActions';
import { ApiRoutes } from '@app/routes';
import { fetch } from 'src/lib/api/fetcher';
import { UserLayout } from './UserLayout';
import { AdminLayout } from './AdminLayout';

interface LayoutProps {
  children: React.ReactNode;
  layoutType: () => string;
}

export interface ChildLayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children, layoutType }: LayoutProps) => {
  const { user } = useTypedSelectors((state) => state.user);
  const { setUser } = useActions();

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!user && token) {
      fetch(ApiRoutes({}).profile, {
        token: window.localStorage.getItem('token'),
      }).then((res) => setUser(res?.data));
    }
  });

  // layout switcher
  // you should define Component.setLayout = function setLayout(){'string'}
  // it is working ONLY per page
  // need to investigate how to define layout per route
  switch (layoutType()) {
    case 'user':
      return <UserLayout> {children} </UserLayout>;
    case 'admin':
      return <AdminLayout>{children}</AdminLayout>;
    default:
      return <UserLayout> {children} </UserLayout>;
  }
};
