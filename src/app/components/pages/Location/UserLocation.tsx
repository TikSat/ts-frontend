import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { Modal } from '@app/components/ui/Modal';
import { NavLink } from '@app/components/ui/NavLink';
import { Input } from '@app/components/ui/Input';
import { BaseSyntheticEvent, useState } from 'react';
import { useActions } from '@app/hooks/useActions';
import { useRouter } from 'next/router';
import { fetch } from 'src/lib/api/fetcher';
import { Fragment } from 'react';

import i from '@app/components/ui/Input/Input.module.css';
import s from './UserLocation.module.scss';

const apiKey = process.env.NEXT_PUBLIC_GEOAPI_KEY || process.env.GEOAPI_KEY;

interface LocationProps {
  city: string;
  country: string;
  result_type: string;
}

interface LocationsListProps {
  locations: LocationProps[];
  func: (e: BaseSyntheticEvent) => void;
}

const citiesAutocomplete = async (lang: string, text: string): Promise<LocationProps[] | []> => {
  const url = 'https://api.geoapify.com/v1/geocode/autocomplete';
  const res = await fetch(url, {
    params: {
      apiKey: apiKey,
      text: text,
      type: 'city',
      format: 'json',
      lang: lang,
    },
  });
  if (res?.data) {
    return res.data.results.filter((r: LocationProps) => r.result_type !== 'county');
  } else {
    return [];
  }
};

const LocationsList = ({ locations, func }: LocationsListProps) => {
  return (
    <Fragment>
      {locations?.map((loc: LocationProps, index) => {
        return (
          <NavLink key={index} href="#" onClick={func}>
            {loc.city}, {loc.country}
          </NavLink>
        );
      })}
    </Fragment>
  );
};

export const UserLocation = () => {
  const { modal } = useTypedSelectors((state) => state.modal);
  const isOpen = modal?.name === 'UserLocation';

  const { preferences } = useTypedSelectors((state) => state.preferences);
  const { location, language } = preferences;
  const router = useRouter();
  const cities = ['Istanbul', 'London', 'New York', 'Sydney', 'Moscow', 'Paris', 'Tokio', 'Warsaw'];

  const { setLocation } = useActions();
  const { setModal } = useActions();
  const state: LocationProps[] = [];
  const [locations, setLocations] = useState(state);

  const changeLocation = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const newLocation = e.currentTarget.textContent;
    setLocation(newLocation);
    localStorage.setItem('location', newLocation);
    router.push('/');
    setModal(null);
  };

  const findLocation = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!e.currentTarget.value || e.currentTarget.value.length < 3) return;

    const data = await citiesAutocomplete(language, e.currentTarget.value);
    setLocations(data);
  };

  return (
    <Modal title={'Change location'} isOpen={isOpen}>
      <div className={''}>
        Current location: <strong>{location}</strong>
      </div>
      <Input
        name={'location'}
        placeholder={'Type your city...'}
        inputSize={'xl'}
        className={i.fullWidth}
        type={'search'}
        onChange={findLocation}
      ></Input>

      <LocationsList locations={locations} func={changeLocation} />

      <hr />
      <h3>Most popular cities</h3>
      <div className={s.list}>
        {cities.map((city, index) => (
          <NavLink key={index} href="#" onClick={changeLocation}>
            {city}
          </NavLink>
        ))}
      </div>
    </Modal>
  );
};
