import { Button } from '../Button';
import { Container } from '../Container';
import { Link } from '../Link';

import s from './Header.module.css';

export const Header = () => {
  return (
    <header>
      <Container>
        <div className={s.secondary}>
          <div className={s.options}>
            <div className={s.optionItem}>
              Language:
              <Link href="/">English</Link>
            </div>
            <div className={s.optionItem}>
              Location:
              <Link href="/">Moscow, Russia</Link>
            </div>
          </div>
          <div className={s.options}>
            <div className={s.optionItem}>
              <Link href="/" theme="silent">
                Help
              </Link>
            </div>
            <div className={s.optionItem}>
              <Link href="/" theme="silent">
                For business
              </Link>
            </div>
            <div className={s.optionItem}>
              <Link href="/" theme="silent">
                Advertising
              </Link>
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
              <Link href="/">Tiksat</Link>
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
            <Link href="/" theme="silent">
              Favorite
            </Link>
            <Link href="/" theme="silent">
              Messages
            </Link>
            <Link href="/" theme="silent">
              My profile
            </Link>

            <Button>Post Free Ad</Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
