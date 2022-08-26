import * as React from 'react';

import s from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={s.root}>{children}</div>;
};
