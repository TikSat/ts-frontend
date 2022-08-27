import { Container } from '@app/components/containers/Container';
import { Header } from '@app/components/containers/Header';
import * as React from 'react';
import s from './Layout.module.css';
import { ChildLayoutProps } from './Layout';

export const UserLayout = ({ children }: ChildLayoutProps) => {
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
