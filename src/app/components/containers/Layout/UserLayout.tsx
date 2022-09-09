import { Container } from '@app/components/containers/Container';
import { Header } from '@app/components/containers/Header';
import { ChildLayoutProps } from './Layout';
import { Fragment } from 'react';
import { SignIn } from '@app/components/pages/SignIn';
import { SignUp } from '@app/components/pages/SignUp';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';

import s from './Layout.module.css';

export const UserLayout = ({ children }: ChildLayoutProps) => {
  const { modal } = useTypedSelectors((state) => state.modal);

  const modals = (
    <Fragment>
      {modal?.name === 'SignIn' && <SignIn />}
      {modal?.name === 'SignUp' && <SignUp />}
    </Fragment>
  );

  return (
    <div className={s.root}>
      <main>
        <Container>
          <Header />
          {children}
        </Container>
      </main>
      {modals}
    </div>
  );
};
