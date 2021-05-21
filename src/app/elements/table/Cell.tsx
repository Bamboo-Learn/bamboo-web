import React, { FC } from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';

import Style from './style.module.scss';

type CellProps = {
  className?: string,
  disabled?: boolean,
  name: string,
  onChange: (e: any) => void
}

type SelectCellProps = CellProps & {
  value: string
}

export const TextCell: FC<SelectCellProps> = ({ disabled, value, className: classNameProps, name, onChange }) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <input name={name} className={`${className} ${classNameProps}`} value={value} onChange={onChange} />
  );
}

export const TextAreaCell: FC<SelectCellProps> = ({ disabled, value, className: classNameProps, name, onChange }) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <TextareaAutosize name={name} className={`${className} ${classNameProps}`} value={value} onChange={onChange} />
  );
}

export const SelectCell: FC<CellProps> = ({ disabled, className: classNameProps }) => {
  const className = classNames({
    [Style.cell]: true,
    [Style.disabled]: disabled
  });
  return (
    <input className={`${className} ${classNameProps}`} onChange={() => { }} />
  );
}