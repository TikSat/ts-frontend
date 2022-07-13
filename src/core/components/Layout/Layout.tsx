import * as React from 'react';

import { Button } from '../Button';
import { Container } from '../Container';

import s from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={s.root}>
      <header>
        <Container>
          <Button theme="silent">Sign up</Button>
        </Container>
      </header>
      <main>
        <Container>{children}</Container>
      </main>
      <footer className={s.footer}>
        <Container>footer</Container>
      </footer>
    </div>
  );
};
