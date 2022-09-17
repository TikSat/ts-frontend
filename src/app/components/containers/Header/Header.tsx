import { DesktopHeader } from '@app/components/containers/Header/DesktopHeader';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <header className={s.header}>
      <DesktopHeader />
    </header>
  );
};
