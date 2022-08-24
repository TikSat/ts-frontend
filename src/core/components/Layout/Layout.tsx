import * as React from 'react';
import { Container } from '../Container';
import { Header } from '../Header';
import s from './Layout.module.css';
import { useTypedSelectors } from '@core/hooks/useTypedSelectors';
import { useActions } from '@core/hooks/useActions';
import { fetchApi } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user } = useTypedSelectors((state) => state.user);
  const { setUser } = useActions();

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!user && token) {
      fetchApi(ApiRoutes({}).profile, {
        token: window.localStorage.getItem('token'),
      }).then((res) => setUser(res));
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
