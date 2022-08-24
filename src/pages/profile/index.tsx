import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { fetchApi } from '@core/helpers/api/fetcher';
import { ApiRoutes } from '@core/routes';
import { useActions } from '@core/hooks/useActions';
import { useTypedSelectors } from '@core/hooks/useTypedSelectors';
import { Profile } from '@core/components/pages/Profile/Profile';
import { useRouter } from 'next/router';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { setUser } = useActions();
  const { user } = useTypedSelectors((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      fetchApi(ApiRoutes({}).profile, {
        token: window.localStorage.getItem('token'),
      }).then((res) => setUser(res));
    }
    setLoading(false);

    if (!user && !loading) {
      router.push('/sign_in');
    }
  }, [user]);

  return <Profile {...user} />;
};

export default ProfilePage;
