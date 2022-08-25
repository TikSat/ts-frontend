import * as React from 'react';
import cn from 'classnames';

import s from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;

  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'primary' | 'secondary' | 'silent';
  icon?: {
    name: string;
    width?: number;
    height?: number;
    position?: 'leading' | 'trailing';
  };
}

export const Button = ({
  children,
  onClick,
  className,
  type = 'button',
  size = 'sm',
  theme = 'primary',
}: ButtonProps) => {
  return (
    <button onClick={onClick} className={cn(s.root, s[size], s[theme], className)} type={type}>
      {children}
    </button>
  );
};
