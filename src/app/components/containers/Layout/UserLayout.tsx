import { Container } from '@app/components/containers/Container';
import { Header } from '@app/components/containers/Header';
import { ChildLayoutProps } from './Layout';
import { Fragment } from 'react';
import { SignIn } from '@app/components/pages/SignIn';
import { SignUp } from '@app/components/pages/SignUp';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { MobileMenu } from '@app/components/containers/MobileMenu';
import { UserLocation } from '@app/components/pages/Location';
import s from './Layout.module.css';

export const UserLayout = ({ children }: ChildLayoutProps) => {
  const { modal } = useTypedSelectors((state) => state.modal);

  const modals = (
    <Fragment>
      {modal?.name === 'SignIn' && <SignIn />}
      {modal?.name === 'SignUp' && <SignUp />}
      {modal?.name === 'UserLocation' && <UserLocation />}
    </Fragment>
  );

  return (
    <div className={s.root}>
      <Container>
        <Header />
        <main>
          {children}
          <MobileMenu />
        </main>
      </Container>
      {modals}
    </div>
  );
};
