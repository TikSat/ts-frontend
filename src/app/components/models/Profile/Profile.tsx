import React from 'react';
import Head from 'next/head';
import { Button } from '@app/components/ui/Button';

export interface ProfileProps {
  id: string;
  email: string;
  profile?: {
    first_name?: string;
  };
}

export const Profile = (user: ProfileProps) => {
  const { id, email, profile } = user;
  return (
    <React.Fragment>
      <Head>
        <title>My profile</title>
      </Head>
      <h1 className={'header'}>Profile</h1>
      <h2>ID: {id}</h2>
      <h2>EMAIL: {email}</h2>
      {profile ? <span>{profile.first_name}</span> : <Button size={'lg'}>Create profile</Button>}
    </React.Fragment>
  );
};
