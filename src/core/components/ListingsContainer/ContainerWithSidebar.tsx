import * as React from 'react';
import s from './ContainerWithSidebar.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

export const ContainerWithSidebar = ({ children }: ContainerProps) => {
  return <div className={s.root}>{children}</div>;
};
