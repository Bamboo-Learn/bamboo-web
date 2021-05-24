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
}

type SelectCellProps = CellProps & {
  // options
}

export const TextCell: FC<CellProps> = ({ disabled, value, className: classNameProps, name, onChange, placeholder }) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <input name={name} className={`${className} ${classNameProps}`} value={value} onChange={onChange} placeholder={placeholder} />
  );
}

export const TextAreaCell: FC<CellProps> = ({ disabled, value, className: classNameProps, name, onChange, placeholder }) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <TextareaAutosize name={name} className={`${className} ${classNameProps}`} value={value} onChange={onChange} placeholder={placeholder} />
  );
}

export const SelectCell: FC<SelectCellProps> = ({ disabled, className: classNameProps }) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <input className={`${className} ${classNameProps}`} onChange={() => { }} />
  );
}