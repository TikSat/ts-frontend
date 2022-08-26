import { FormEvent } from 'react';
import React from 'react';
import { NextPageWithLayout } from 'src/pages/_app';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { useActions } from '@app/hooks/useActions';
import { ApiRoutes } from '@app/routes';
import { fetch } from 'src/lib/api/fetcher';
import { Input } from '@app/components/ui/Input';
import { Button } from '@app/components/ui/Button';

const SignUpPage: NextPageWithLayout = () => {
  const { user } = useTypedSelectors((state) => state.user);
  const { setUser } = useActions();

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

    const res = await fetch(ApiRoutes({}).signUp, options);

    if (res?.data.token) {
      window.localStorage.setItem('token', res.data.token);
      window.localStorage.setItem('refreshToken', res.data.refresh_token);
      fetch(ApiRoutes({}).profile, {
        token: window.localStorage.getItem('token'),
      }).then((res) => setUser(res?.data));
    }
  };

  // TODO: handle errors and show
  return !user ? (
    <React.Fragment>
      <h1 className={'header'}>Registration</h1>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Email" name={'email'} />
        <Input placeholder="Password" name={'password'} />
        <Input placeholder="Password Confirmation" name={'password_confirmation'} />
        <Button type="submit">Sign Up</Button>
      </form>
    </React.Fragment>
  ) : (
    <div>Already signed in</div>
  );
};

export default SignUpPage;
