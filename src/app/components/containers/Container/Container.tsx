import s from './Container.module.scss';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={s.root}>{children}</div>;
};
