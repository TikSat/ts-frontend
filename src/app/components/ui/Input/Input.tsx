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
  label?: string;
}

export const Input = ({
  type = 'text',
  size = 'md',
  theme = 'primary',
  className,
  placeholder = 'Type here...',
  name,
  label,
}: InputProps) => {
  return (
    <div className={s.inputWrapper}>
      <label className={s.label} htmlFor="">
        {label}
      </label>
      <input
        className={cn(s.root, s[size], s[theme], className)}
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};
