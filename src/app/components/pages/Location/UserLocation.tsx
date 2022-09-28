import { useTypedSelectors } from '@app/hooks/useTypedSelectors';
import { Modal } from '@app/components/ui/Modal';
import { NavLink } from '@app/components/ui/NavLink';
import { Input } from '@app/components/ui/Input';
import i from '@app/components/ui/Input/Input.module.css';
import s from './UserLocation.module.scss';

export const UserLocation = () => {
  const { modal } = useTypedSelectors((state) => state.modal);
  const isOpen = modal?.name === 'UserLocation';

  const cities = ['Istanbul', 'London', 'New York', 'Sydney', 'Moscow', 'Paris', 'Tokio', 'Warsaw'];

  return (
    <Modal title={'Change location'} isOpen={isOpen}>
      <Input
        name={'location'}
        placeholder={'Type your city...'}
        size={'xl'}
        className={i.fullWidth}
        type={'search'}
      ></Input>
      <h3>Most popular choices</h3>
      <div className={s.list}>
        {cities.map((city, index) => (
          <NavLink key={index} href="#">
            {city}
          </NavLink>
        ))}
      </div>
    </Modal>
  );
};
