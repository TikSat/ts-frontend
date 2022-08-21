import { Button } from '../Button';
import { Container } from '../Container';
import { NavLink } from '../NavLink';
import { Icon } from '@core/components/Icon';
import s from './Header.module.css';

export const Header = () => {
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
          <NavLink href="/" theme="silent" withIcon>
            <Icon name="heart"></Icon>
            Favorite
          </NavLink>
          <NavLink href="/" theme="silent" withIcon>
            <Icon name="message"></Icon>
            Messages
          </NavLink>
          <NavLink href="/" theme="silent" withIcon>
            <Icon name="user"></Icon>
            My profile
          </NavLink>

          <Button>Post Free Ad</Button>
        </div>
      </div>
    </header>
  );
};
