import { BaseSyntheticEvent, Fragment, useEffect } from 'react';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import { Button } from '@app/components/ui/Button';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { useActions } from '@app/hooks/useActions';
import Dropdown, { type Option } from 'react-dropdown';
import cn from 'classnames';
import s from './Header.module.scss';

export const DesktopHeader = () => {
  const { user } = useTypedSelectors((state) => state.user);
  const { setUser } = useActions();
  const { setModal } = useActions();
  const { setLocation } = useActions();
  const { setLanguage } = useActions();
  const { preferences } = useTypedSelectors((state) => state.preferences);
  const { language, location } = preferences;

  useEffect(() => {
    const defaultLocation = localStorage.getItem('location') || location;
    const defaultLanguage = localStorage.getItem('language') || language;
    setLocation(defaultLocation);
    setLanguage(defaultLanguage);
  });

  const chooseLanguage = (lang: Option) => {
    setLanguage(lang.value);
    localStorage.setItem('language', lang.value);
  };

  const signOut = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  const langs = [
    { value: 'en', label: 'English', className: s.en },
    { value: 'tr', label: 'Türkçe', className: s.tr },
    { value: 'ru', label: 'Русский', className: s.ru },
  ];

  return (
    <Fragment>
      <div className={s.secondary}>
        <div className={s.options}>
          <div className={s.optionItem}>
            Language:
            <Dropdown
              menuClassName={s.dropdownMenu}
              // @ts-ignore
              placeholderClassName={cn(s.selected, s[language])}
              options={langs}
              value={language}
              onChange={chooseLanguage}
            />
          </div>
          <div className={s.optionItem}>
            Location:
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModal({ name: 'UserLocation' });
              }}
            >
              <span>{location}</span>
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
          {user && (
            <div className={s.optionItem}>
              <NavLink href="#" theme="silent" onClick={signOut}>
                Sign Out
              </NavLink>
            </div>
          )}
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
          <div className={s.desktop}>
            <NavLink href={'/favorites'} theme="silent" withIcon authRequired>
              <Icon name="heart"></Icon>
              Favorites
            </NavLink>
            <NavLink href={'/messages'} theme="silent" withIcon authRequired>
              <Icon name="message"></Icon>
              Messages
            </NavLink>
            <NavLink href={'/profile'} theme="silent" withIcon authRequired>
              <Icon name="user"></Icon>
              My profile
            </NavLink>
            <Button>
              <NavLink href="/listings/add" theme={'white'}>
                Post Free Ad
              </NavLink>
            </Button>
          </div>
          <div className={s.mobile}>
            <NavLink href="#">
              <Icon name="search" size={'md'} theme={'primary'} className={'bordered'} />
            </NavLink>
            <NavLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModal({ name: 'UserLocation' });
              }}
            >
              <Icon name="location" size={'md'} theme={'primary'} className={'bordered'} />
            </NavLink>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
