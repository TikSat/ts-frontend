import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { Modal } from '@app/components/ui/Modal';
import { NavLink } from '@app/components/ui/NavLink';
import { Input } from '@app/components/ui/Input';
import i from '@app/components/ui/Input/Input.module.css';
import s from './UserLocation.module.scss';
import { BaseSyntheticEvent } from 'react';
import { useActions } from '@app/hooks/useActions';
import { useRouter } from 'next/router';

export const UserLocation = () => {
  const { modal } = useTypedSelectors((state) => state.modal);
  const isOpen = modal?.name === 'UserLocation';

  const { preferences } = useTypedSelectors((state) => state.preferences);
  const { location } = preferences;
  const router = useRouter();
  const cities = ['Istanbul', 'London', 'New York', 'Sydney', 'Moscow', 'Paris', 'Tokio', 'Warsaw'];
  const countries = [
    'Russia',
    'United States',
    'Canada',
    'Japan',
    'Turkey',
    'France',
    'United Kingdom',
  ];

  const { setLocation } = useActions();
  const { setModal } = useActions();
  const changeLocation = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const newLocation = e.currentTarget.textContent;
    setLocation(newLocation);
    localStorage.setItem('location', newLocation);
    router.push('/');
    setModal(null);
  };

  return (
    <Modal title={'Change location'} isOpen={isOpen}>
      <div className={''}>
        Current location: <strong>{location}</strong>
      </div>
      <Input
        name={'location'}
        placeholder={'Type your city...'}
        size={'xl'}
        className={i.fullWidth}
        type={'search'}
      ></Input>
      <hr />
      <h3>Most popular countries</h3>
      <div className={s.list}>
        {countries.map((city, index) => (
          <NavLink key={index} href="#" onClick={changeLocation}>
            {city}
          </NavLink>
        ))}
      </div>
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
