import { NextPage } from 'next';
import { Input } from '@core/components/Input';
import { Button } from '@core/components/Button';
import { ApiRoutes } from '@core/routes';
import { fetchApi } from '@core/helpers/api/fetcher';
import { FormEvent } from 'react';
import React from 'react';
import { useRouter } from 'next/router';

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password, password_confirmation } = event.currentTarget;
    const data = {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    const res = await fetchApi(ApiRoutes({}).signUp, options);

    if (res && res.token && res.refresh_token) {
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('refreshToken', res.refresh_token);
      router.push('/profile');
    }
  };

  // TODO: handle errors and show
  return (
    <React.Fragment>
      <h1 className={'header'}>Registration</h1>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Email" name={'email'} />
        <Input placeholder="Password" name={'password'} />
        <Input placeholder="Password Confirmation" name={'password_confirmation'} />
        <Button type="submit">Sign Up</Button>
      </form>
    </React.Fragment>
  );
};

export default SignUpPage;
