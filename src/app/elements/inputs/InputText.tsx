

import React, { FC } from 'react';

export type InputTextPropTypes = {
  onChange: any,
  onReturn?: any,
  value: string,
  placeholder: string,
  isPassword?: boolean,
  className?: string,
  name?: string
}

export const InputText: FC<InputTextPropTypes> = ({
  onChange: propsOnChange,
  onReturn: propsOnReturn,
  value,
  placeholder,
  isPassword,
  className,
  name
}) => {

  const onChange = (e: any) => {
    e.preventDefault();
    propsOnChange(e);
  }

  const onKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      propsOnReturn(e);
    }
  }

  return (
    <input
      name={name}
      className={className}
      type={isPassword ? 'password' : 'text'}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}


