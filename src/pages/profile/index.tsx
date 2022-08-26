import React from 'react';
import { NextPageWithLayout } from 'src/pages/_app';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { NavLink } from '@app/components/ui/NavLink';
import { Profile } from '@app/components/models/Profile';

const ProfilePage: NextPageWithLayout = () => {
  const { user } = useTypedSelectors((state) => state.user);

  return user ? <Profile {...user} /> : <NavLink href={'/sign_in'}> Sign in </NavLink>;
};

export default ProfilePage;
