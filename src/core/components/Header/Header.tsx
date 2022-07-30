import * as React from 'react';

import { Button } from '../Button';
import { Container } from '../Container';

import s from './Header.module.css';

export const Header = () => {
  return (
    <header>
      <Container>
        <div className={s.level1}>
          <div className={s.options}>
            <div className={s.optionsList}>
              Language:
              <span>English</span>
            </div>
            <div className={s.optionsList}>
              Location:
              <span>Moscow, Russia</span>
            </div>
          </div>
          <div className={s.options}>
            <div className={s.optionsList}>Help</div>
            <div className={s.optionsList}>For business</div>
            <div className={s.optionsList}>Ads</div>
          </div>
        </div>
        <div className={s.level2}>
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
            <span className={s.companyName}>Tiksat</span>
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
            <div>Favorite</div>
            <div>Messages</div>
            <div>My profile</div>
            <Button>Post Free Ad</Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
