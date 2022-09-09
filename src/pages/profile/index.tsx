import React, { useEffect } from 'react';
import { NextPageWithLayout } from 'src/pages/_app';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { Profile } from '@app/components/models/Profile';
import { useRouter } from 'next/router';

const ProfilePage: NextPageWithLayout = () => {
  const { user } = useTypedSelectors((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  return user ? <Profile {...user} /> : <div>You have to sign in first. Redirecting...</div>;
};

export default ProfilePage;
