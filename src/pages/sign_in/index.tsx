import { NextPage } from 'next';
import { Input } from '@core/components/Input';
import { Button } from '@core/components/Button';
import { ApiRoutes } from '@core/routes';
import { fetch } from '@core/helpers/api/fetcher';
import { FormEvent } from 'react';
import React from 'react';
import { useActions } from '@core/hooks/useActions';
import { useTypedSelectors } from '@core/hooks/useTypedSelectors';

const SignInPage: NextPage = () => {
  const { user } = useTypedSelectors((state) => state.user);
  const { setUser } = useActions();

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

    const res = await fetch(ApiRoutes({}).signIn, options);

    if (res.token && res.refresh_token) {
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('refreshToken', res.refresh_token);
      fetch(ApiRoutes({}).profile, {
        token: window.localStorage.getItem('token'),
      }).then((res) => setUser(res));
    }
  };

  return !user ? (
    <React.Fragment>
      <h1 className={'header'}>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Email" name={'email'} />
        <Input placeholder="Password" name={'password'} />
        <Button type="submit">Login</Button>
      </form>
    </React.Fragment>
  ) : (
    <div>Already signed in</div>
  );
};

export default SignInPage;
