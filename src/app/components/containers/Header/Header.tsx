import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import { Button } from '@app/components/ui/Button';
import { useRouter } from 'next/router';
import { Modal } from '@app/components/ui/Modal';
import React, { useState } from 'react';
import { SignIn } from '@app/components/pages/SignIn';

import s from './Header.module.css';

export const Header = () => {
  const { user } = useTypedSelectors((state) => state.user);
  const isLogged = !!user;
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);

  const showModal = (e: Event & { currentTarget: { href: string } }): void => {
    e.preventDefault();

    if (isLogged) {
      router.push(e.currentTarget?.href || '/');
    } else {
      setModalOpen(true);
    }
  };

  return (
    <header>
      <div className={s.secondary}>
        <div className={s.options}>
          <div className={s.optionItem}>
            Language:
            <NavLink href="/">English</NavLink>
          </div>
          <div className={s.optionItem}>
            Location:
            <NavLink href="/">
              <span>Moscow, Russia</span>
              <Icon name="location" size={'xs'} theme={'secondary'} />
            </NavLink>
          </div>
        </div>
        <div className={s.options}>
          <div className={s.optionItem}>
            <NavLink href="/" theme="silent">
              Help
            </NavLink>
          </div>
          <div className={s.optionItem}>
            <NavLink href="/" theme="silent">
              For business
            </NavLink>
          </div>
          <div className={s.optionItem}>
            <NavLink href="/" theme="silent">
              Advertising
            </NavLink>
          </div>
        </div>
      </div>
      <div className={s.main}>
        <div className={s.logo}>
          <NavLink href={'/'}>
            <Icon size={'lg'} theme={'secondary'} name={'menu'} />
          </NavLink>
          <NavLink href="/">
            <Icon name={'logo'} size={'logo'} />
          </NavLink>
        </div>
        <div className={s.searchContainer}>
          <div className={s.search}>
            <div className={s.searchInput}>
              <input type="text" placeholder="Moscow" />
            </div>
            <div className={s.searchInput}>
              <input type="text" placeholder="All categories" />
            </div>
            <div className={s.searchInput}>
              <input type="text" placeholder="Type search.." />
            </div>
          </div>
        </div>
        <div className={s.right}>
          <NavLink href={'/profile'} theme="silent" withIcon onClick={showModal}>
            <Icon name="heart"></Icon>
            Favorite
          </NavLink>
          <NavLink href={'/profile'} theme="silent" withIcon onClick={showModal}>
            <Icon name="message"></Icon>
            Messages
          </NavLink>
          <NavLink href={'/profile'} theme="silent" withIcon onClick={showModal}>
            <Icon name="user"></Icon>
            My profile
          </NavLink>

          <Button>Post Free Ad</Button>
        </div>
      </div>

      <Modal isOpen={modalOpen} handleClose={handleModalClose} title={'Sign In'}>
        <SignIn />
      </Modal>
    </header>
  );
};
