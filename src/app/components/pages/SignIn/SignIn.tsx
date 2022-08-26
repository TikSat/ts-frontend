import React, { FormEvent, useState } from 'react';
import { Input } from '@app/components/ui/Input';
import { NavLink } from '@app/components/ui/NavLink';
import { Button } from '@app/components/ui/Button';
import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';
import { useActions } from '@app/hooks/useActions';

import s from './SignIn.module.css';

export const SignIn = () => {
  const { setUser } = useActions();
  const [error, setError] = useState(false);

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

    if (res?.status == 200) {
      if (res?.data.token) {
        window.localStorage.setItem('token', res.data.token);
        window.localStorage.setItem('refreshToken', res.data.refresh_token);
        fetch(ApiRoutes({}).profile, {
          token: window.localStorage.getItem('token'),
        }).then((res) => setUser(res?.data));
      }
    } else {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} id={'signIn'}>
        <Input placeholder="Email" name={'email'} size={'lg'} label="Email" />
        <Input
          placeholder="Password"
          type={'password'}
          name={'password'}
          size={'lg'}
          label="Password"
        />
      </form>
      {error ? <div className={s.error}>Your email or password is incorrect.</div> : null}
      <span className={s.help}>
        <NavLink href={'#'}> I forgot my password </NavLink>
      </span>
      <hr />
      <Button type="submit" form={'signIn'} size={'lg'} className={'fullWidth'}>
        Login
      </Button>
      <div className={s.help}>
        <span className={'muted'}>New to Tiksat?</span>
        <NavLink href={'#'}> Create an account </NavLink>
      </div>
    </React.Fragment>
  );
};
