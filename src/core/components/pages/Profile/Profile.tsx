import React, { FC } from 'react';
import Head from 'next/head';
import { Button } from '@core/components/Button';

export type ProfilePageProps = {
  id?: string;
  email?: string;
  profile?: {
    first_name?: string;
  };
};

export const Profile: FC<ProfilePageProps> = ({ id, email, profile }) => {
  const isProfilePresent = !!profile;

  return (
    <React.Fragment>
      <Head>
        <title>My profile</title>
      </Head>
      <h1 className={'header'}>Profile</h1>
      <h2>ID: {id}</h2>
      <h2>EMAIL: {email}</h2>
      {isProfilePresent ? (
        <span>{profile.first_name}</span>
      ) : (
        <Button size={'lg'}>Create profile</Button>
      )}
    </React.Fragment>
  );
};
