import { NavLink } from '@app/components/ui/NavLink';
import { Icon } from '@app/components/ui/Icon';
import React from 'react';

import s from './AdminHeader.module.css';

export const AdminHeader = () => {
  return (
    <header>
      <div className={s.main}>
        <div className={s.logo}>
          <NavLink href={'/backend'}>
            <Icon size={'lg'} theme={'secondary'} name={'menu'} />
          </NavLink>
          <NavLink href="/backend">
            <Icon name={'logo'} size={'logo'} />
          </NavLink>
        </div>
        <div className={s.main}>
          <NavLink href={'/backend/categories'}>Customize</NavLink>
          <NavLink href={'/backend/categories'}>Categories</NavLink>
          <NavLink href={'/backend/categories'}>Custom Fields</NavLink>
          <NavLink href={'/backend/categories'}>Notifications</NavLink>
        </div>
      </div>
    </header>
  );
};
