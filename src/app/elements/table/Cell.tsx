import React, { FC } from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

import Style from './style.module.scss';

type CellProps = {
  className?: string,
  disabled?: boolean,
  name: string,
  onChange: (e: any) => void,
  placeholder?: string
  value: string
  onFocus?: () => void,
  onBlur?: () => void,
  onReturn?: () => void
}

type SelectCellProps = CellProps & {
  // options
}

export const TextCell: FC<CellProps> = ({
  disabled, value, className: classNameProps,
  name, onChange, placeholder, onFocus, onBlur, onReturn
}) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  const onKeyPress = (e: any) => {
    if (e.key === 'Enter' && !!onReturn) {
      onReturn();
    }
  }
  return (
    <input
      name={name}
      className={`${className} ${classNameProps}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
    />
  );
}

export const TextAreaCell: FC<CellProps> = ({
  disabled, value,
  className: classNameProps,
  name, onChange, placeholder, onFocus, onBlur
}) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <TextareaAutosize name={name} className={`${className} ${classNameProps}`} value={value} onChange={onChange} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} />
  );
}

export const SelectCell: FC<SelectCellProps> = ({
  disabled,
  className: classNameProps,
  onChange
}) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <input className={`${className} ${classNameProps}`} onChange={onChange} />
  );
}