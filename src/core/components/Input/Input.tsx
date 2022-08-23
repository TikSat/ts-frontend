import React from 'react';
import cn from 'classnames';
import s from './Input.module.css';

export interface InputProps {
  type?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'primary' | 'secondary';
  className?: string;
  placeholder?: string;
  name: string;
}

export const Input = ({
  type = 'text',
  size = 'md',
  theme = 'primary',
  className,
  placeholder = 'Type here...',
  name,
}: InputProps) => {
  return (
    <input
      className={cn(s.root, s[size], s[theme], className)}
      type={type}
      placeholder={placeholder}
      name={name}
    />
  );
};
