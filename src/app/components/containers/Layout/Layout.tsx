import * as React from 'react';
import { Container } from '../Container';
import { Header } from '../Header';
import { useEffect } from 'react';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { useActions } from '@app/hooks/useActions';
import { ApiRoutes } from '@app/routes';
import { fetch } from 'src/lib/api/fetcher';
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
