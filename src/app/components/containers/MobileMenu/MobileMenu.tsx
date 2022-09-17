import s from './MobileMenu.module.scss';
import { Icon } from '@app/components/ui/Icon';
import { NavLink } from '@app/components/ui/NavLink';

export const MobileMenu = () => {
  return (
    <div className={s.root}>
      <NavLink href={'/'} theme="silent" withIcon>
        <Icon name="home" size={'md'}></Icon>
        Home
      </NavLink>
      <NavLink href={'/'} theme="silent" withIcon>
        <Icon name="heart" size={'md'}></Icon>
        Favorite
      </NavLink>
      <NavLink href={'/'} theme="silent" withIcon>
        <Icon name="plusCircle" size={'md'}></Icon>
        My ads
      </NavLink>
      <NavLink href={'/'} theme="silent" withIcon>
        <Icon name="message" size={'md'}></Icon>
        Messages
      </NavLink>
      <NavLink href={'/'} theme="silent" withIcon>
        <Icon name="user" size={'md'}></Icon>
        My profile
      </NavLink>
    </div>
  );
};
