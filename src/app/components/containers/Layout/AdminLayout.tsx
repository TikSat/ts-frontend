import { Container } from '@app/components/containers/Container';
import * as React from 'react';
import { ChildLayoutProps } from './Layout';
import { AdminHeader } from '@app/components/containers/AdminHeader';
import s from './Layout.module.css';

export const AdminLayout = ({ children }: ChildLayoutProps) => {
  return (
    <div className={s.root}>
      <main>
        <Container>
          <AdminHeader />
          {children}
        </Container>
      </main>
    </div>
  );
};
