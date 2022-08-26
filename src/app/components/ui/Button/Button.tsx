import * as React from 'react';
import cn from 'classnames';

import s from './Button.module.css';
import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<any> {
  onClick?: () => void;
  size?: 'initial' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'primary' | 'secondary' | 'silent';
  icon?: {
    name: string;
    width?: number;
    height?: number;
    position?: 'leading' | 'trailing';
  };
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
  size = 'sm',
  theme = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(s.root, s[size], s[theme], s[className])}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
