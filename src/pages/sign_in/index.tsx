import { NextPage } from 'next';
import { Input } from '@core/components/Input';
import { Button } from '@core/components/Button';
import { ApiRoutes } from '@core/routes';
import { fetchApi } from '@core/helpers';
import { FormEvent } from 'react';
import React from 'react';

const SignInPage: NextPage = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = event.currentTarget;
    const data = {
      email: email.value,
      password: password.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    const res = await fetchApi(ApiRoutes({}).signIn, options);

    window.localStorage.setItem('token', res.token);
    window.localStorage.setItem('refreshToken', res.refresh_token);
  };

  return (
    <React.Fragment>
      <h1 className={'header'}>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Email" name={'email'} />
        <Input placeholder="Password" name={'password'} />
        <Button type="submit">Login</Button>
      </form>
    </React.Fragment>
  );
};

export default SignInPage;
