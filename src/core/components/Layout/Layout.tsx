import * as React from 'react';
import { Container } from '../Container';
import { Header } from '../Header';
import s from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
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
