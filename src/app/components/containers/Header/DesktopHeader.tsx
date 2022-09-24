import { Fragment } from 'react';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import { Button } from '@app/components/ui/Button';
import s from './Header.module.scss';

export const DesktopHeader = () => {
  return (
    <Fragment>
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
              <Icon name="location" size={'sm'} theme={'secondary'} />
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
      </div>
    </Fragment>
  );
};
