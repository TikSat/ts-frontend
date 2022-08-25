import * as React from 'react';
import { Container } from '../Container';
import { Header } from '../Header';
import { useTypedSelectors } from '@core/hooks/useTypedSelectors';
import { useActions } from '@core/hooks/useActions';
import { fetch } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { useEffect } from 'react';
import s from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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

  return (
    <div className={s.root}>
      <main>
        <Container>
          <Header />
          {children}
        </Container>
      </main>
    </div>
  );
};
