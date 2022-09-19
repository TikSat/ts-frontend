import * as React from 'react';
import { useEffect } from 'react';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { useActions } from '@app/hooks/useActions';
import { ApiRoutes } from '@app/routes';
import { fetch } from 'src/lib/api/fetcher';
import { UserLayout } from './UserLayout';

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
    if (!user) {
      authUser()
        .then((res: any) => setUser(res))
        .catch((e: any) => console.log(e));
    }
  });

  // layout switcher
  // you should define Component.setLayout = function setLayout(){'string'}
  // it is working ONLY per page
  // need to investigate how to define layout per route
  switch (layoutType()) {
    default:
      return <UserLayout> {children} </UserLayout>;
  }
};

const authUser = async (): Promise<any> => {
  const token = window.localStorage.getItem('token');
  const refresh_token = window.localStorage.getItem('refreshToken');

  if (!token && !refresh_token) return null;

  const res = await fetch(ApiRoutes({}).profile, {
    token: token,
    refresh_token: refresh_token,
  });

  if (res?.status == 200) {
    return res?.data;
  } else {
    const tokenRes = await fetch(ApiRoutes({}).tokens, {
      data: {
        refresh_token: refresh_token,
        token: token,
      },
      method: 'POST',
    });

    if (tokenRes?.status == 200 || tokenRes?.status == 201) {
      window.localStorage.setItem('token', tokenRes?.data.token);
      window.localStorage.setItem('refreshToken', tokenRes?.data.refresh_token);
      return await authUser();
    } else {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('refreshToken');
      return null;
    }
  }
};
