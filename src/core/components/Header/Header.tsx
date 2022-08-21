import { Button } from '../Button';
import { Container } from '../Container';
import { NavLink } from '../NavLink';

import s from './Header.module.css';

export const Header = () => {
  return (
    <header>
      <Container>
        <div className={s.secondary}>
          <div className={s.options}>
            <div className={s.optionItem}>
              <dd className={s.muted}>Language:</dd>
              <NavLink href="/">English</NavLink>
            </div>
            <div className={s.optionItem}>
              <dd className={s.muted}>Your Location:</dd>
              <NavLink href="/">Moscow, Russia</NavLink>
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
            <span className={s.icon}>
              -----
              <br />
              ---
              <br />
              -----
              <br />
              ----
              <br />
            </span>
            <span className={s.companyName}>
              <NavLink href="/">Tiksat</NavLink>
            </span>
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
            <NavLink href="/" theme="silent">
              Favorite
            </NavLink>
            <NavLink href="/" theme="silent">
              Messages
            </NavLink>
            <NavLink href="/" theme="silent">
              My profile
            </NavLink>

            <Button>Post Free Ad</Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
