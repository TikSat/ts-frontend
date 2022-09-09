import { useMediaQuery } from 'react-responsive';
import { MobileHeader } from '@app/components/containers/Header/MobileHeader';
import { DesktopHeader } from '@app/components/containers/Header/DesktopHeader';

export const Header = () => {
  const isDesktop = useMediaQuery({ minWidth: 992 });

  return <header>{isDesktop ? <DesktopHeader /> : <MobileHeader />}</header>;
};
