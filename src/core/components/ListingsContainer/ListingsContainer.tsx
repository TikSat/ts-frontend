import * as React from 'react';

import s from './ListingsContainer.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

export const ListingsContainer = ({ children }: ContainerProps) => {
  return <div className={s.root}>{children}</div>;
};
