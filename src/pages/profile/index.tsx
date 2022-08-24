import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { fetchApi } from '@core/helpers';
import { ApiRoutes } from '@core/routes';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ProfilePage: NextPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: undefined,
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      return fetchApi(ApiRoutes({}).profile, { token: window.localStorage.getItem('token') });
    };

    fetchData().then((res) => {
      setUser(res);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!user) {
    router.push('/sign_in');
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <Head>
        <title>My profile</title>
      </Head>
      <h1 className={'header'}>Profile</h1>
      <h2>{user.email}</h2>
    </React.Fragment>
  );
};

export default ProfilePage;
