import { BaseSyntheticEvent, Fragment, useEffect, useState } from 'react';
import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import { Button } from '@app/components/ui/Button';
import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { useActions } from '@app/hooks/useActions';
import Dropdown, { type Option } from 'react-dropdown';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Input } from '@app/components/ui/Input';
import { ApiRoutes } from '@app/routes';
import { fetch } from 'src/lib/api/fetcher';
import { ListingProps } from '@app/components/models/Listing';

import s from './Header.module.scss';

interface MobileSearchProps {
  visible: boolean;
  setVisible: (boolean: boolean) => void;
}

const MobileSearch = ({ visible, setVisible }: MobileSearchProps) => {
  const [results, setResults] = useState([]);

  const showSearch = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    document.getElementsByTagName('main')[0].classList.add('overlay');
    setVisible(true);
  };

  const hideSearch = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    hide();
  };

  const hide = () => {
    document.getElementsByTagName('main')[0].classList.remove('overlay');
    setVisible(false);
    setResults([]);
  };

  const autocompleteListings = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const input = e.currentTarget.value;
    if (!input || input.length < 3) {
      setResults([]);
      return;
    }

    const route = ApiRoutes({}).autocompleteListings;
    const results = await fetch(route, {
      params: {
        q: input,
        items: 10,
        response: { include: ['id', 'title', 'slug', 'category'] },
      },
    });
    if (!results?.data) return;

    setResults(results.data);
  };

  if (visible) {
    return (
      <Fragment>
        <Input type={'search'} inputSize={'lg'} onChange={autocompleteListings}></Input>
        <NavLink theme={'white'} href="#" onClick={hideSearch}>
          Done
        </NavLink>
        <SearchResults results={results} hide={hide} />
      </Fragment>
    );
  } else {
    return (
      <NavLink href="#" onClick={showSearch}>
        <Icon name="search" size={'md'} theme={'primary'} className={'bordered'} />
      </NavLink>
    );
  }
};

interface SearchResultsProps {
  results: ListingProps[];
  hide: () => void;
}

const SearchResults = ({ results, hide }: SearchResultsProps) => {
  const router = useRouter();

  return (
    <div className={s.searchResults}>
      <span className={'muted'}>Relevant Results</span>
      <hr />
      {results.length == 0 && <span>No results</span>}

      {results.length > 0 &&
        results.map((listing: ListingProps) => {
          const path = `/${listing?.category?.slug}/${listing.slug}`;
          return (
            <div key={listing.id}>
              <span className={'muted'}>{listing.category?.name}</span>
              <NavLink href={'#'} onClick={() => router.push(path).then(hide)}>
                {listing.title}
              </NavLink>
            </div>
          );
        })}
    </div>
  );
};

export const DesktopHeader = () => {
  const { user } = useTypedSelectors((state) => state.user);
  const { setUser, setModal } = useActions();
  const { setLocation, setLanguage } = useActions();
  const [searchVisible, setSearchVisible] = useState(false);
  const { preferences } = useTypedSelectors((state) => state.preferences);
  const { language, location } = preferences;
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const defaultLocation = localStorage.getItem('location') || location;
    const defaultLanguage = localStorage.getItem('language') || language;

    setLocation(defaultLocation);
    setLanguage(defaultLanguage);
    router.push(router.pathname, router.asPath, { locale: defaultLanguage });
  }, [location, language]);

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
            {t('header.lang')}:
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
            {t('header.loc')}:
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
        {!searchVisible && (
          <div className={s.logo}>
            <NavLink href={'/'}>
              <Icon size={'lg'} theme={'secondary'} name={'menu'} />
            </NavLink>
            <NavLink href="/">
              <Icon name={'logo'} size={'logo'} />
            </NavLink>
          </div>
        )}
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
            <MobileSearch visible={searchVisible} setVisible={setSearchVisible} />
            {!searchVisible && (
              <NavLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setModal({ name: 'UserLocation' });
                }}
              >
                <Icon name="location" size={'md'} theme={'primary'} className={'bordered'} />
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
