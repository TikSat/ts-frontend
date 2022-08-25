import * as React from 'react';
import s from './Sidebar.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: ContainerProps) => {
  return <div className={s.root}>{children}</div>;
};
