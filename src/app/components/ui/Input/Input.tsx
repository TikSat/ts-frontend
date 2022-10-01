import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import s from './Input.module.css';

interface InputProps extends InputHTMLAttributes<any> {
  inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'primary' | 'secondary';
  className?: string;
  placeholder?: string;
  name?: string;
  label?: string;
}

export const Input = ({
  type = 'text',
  inputSize = 'md',
  theme = 'primary',
  className,
  placeholder = 'Type here...',
  name,
  label,
  ...rest
}: InputProps) => {
  return (
    <div className={s.inputWrapper}>
      {label && (
        <label className={s.label} htmlFor="">
          {label}
        </label>
      )}
      <input
        className={cn(s.root, s[inputSize], s[theme], className)}
        type={type}
        placeholder={placeholder}
        name={name}
        {...rest}
      />
    </div>
  );
};
