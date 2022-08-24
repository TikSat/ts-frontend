import { NextPage } from 'next';
import React from 'react';
import { useTypedSelectors } from '@core/hooks/useTypedSelectors';
import { Profile } from '@core/components/pages/Profile/Profile';
import Link from 'next/link';

const ProfilePage: NextPage = () => {
  const { user } = useTypedSelectors((state) => state.user);

  return user ? <Profile {...user} /> : <Link href={'/sign_in'}> Sign in </Link>;
};

export default ProfilePage;
