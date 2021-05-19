

import React, { FC } from 'react';

export type InputTextPropTypes = {
  onChange: any,
  onReturn?: any,
  value: string,
  placeholder: string,
  isPassword?: boolean,
}

type DecoratedInputTextPropTypes = InputTextPropTypes & {
  className: string
};

export const InputText: FC<DecoratedInputTextPropTypes> = ({
  onChange: propsOnChange,
  onReturn: propsOnReturn,
  value,
  placeholder,
  isPassword,
  className
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
      className={className}
      type={isPassword ? 'password' : 'text'}
      placeholder={placeholder}
      value={value || ''}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}


