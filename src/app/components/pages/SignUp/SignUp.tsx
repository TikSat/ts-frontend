import React, { FormEvent, useState } from 'react';
import { Input } from '@app/components/ui/Input';
import { NavLink } from '@app/components/ui/NavLink';
import { Button } from '@app/components/ui/Button';
import { fetch } from 'src/lib/api/fetcher';
import { ApiRoutes } from '@app/routes';
import { useActions } from '@app/hooks/useActions';
import { Modal } from '@app/components/ui/Modal';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';

import s from './SignUp.module.css';
import b from '@app/components/ui/Button/Button.module.scss';

export const SignUp = () => {
  const { setUser, setModal } = useActions();
  const [error, setError] = useState(false);
  const { modal } = useTypedSelectors((state) => state.modal);
  const isOpen = modal?.name === 'SignUp';

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

    if (res && res.status == 200) {
      const token = res.data.token;
      const refresh_token = res.data.refresh_token;

      if (token && refresh_token) {
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('refreshToken', refresh_token);

        fetch(ApiRoutes({}).profile, {
          token: token,
          refresh_token: refresh_token,
        }).then((res) => setUser(res?.data));
        setModal(null);
      }
    } else {
      setError(true);
    }
  };

  return (
    <Modal title={'Sign Up'} isOpen={isOpen}>
      <form onSubmit={handleSubmit} id={'signUp'}>
        <Input placeholder="Email" name={'email'} size={'lg'} label="Email" />
        <Input
          placeholder="Password"
          type={'password'}
          name={'password'}
          size={'lg'}
          label="Password"
        />
        <Input
          placeholder="Password confirmation"
          type={'password'}
          name={'password_confirmation'}
          size={'lg'}
          label="Password confirmation"
        />
      </form>
      {error ? <div className={s.error}>Your email or password is incorrect.</div> : null}
      {/*<span className={s.help}>*/}
      {/*  <NavLink href={'#'}> I forgot my password </NavLink>*/}
      {/*</span>*/}
      <hr />
      <Button type="submit" form={'signUp'} size={'lg'} className={b.w100}>
        Sign Up
      </Button>
      <div className={s.help}>
        <span className={'muted'}>Already have an account?</span>
        <NavLink
          href={'#'}
          onClick={() => {
            setModal({ name: 'SignIn' });
          }}
        >
          Sign in
        </NavLink>
      </div>
    </Modal>
  );
};
