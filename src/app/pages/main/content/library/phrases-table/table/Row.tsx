import React, { FC } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

type RowProps = {
  className?: string,
  isOpen: boolean,
  confidence: number,
}

export const Row: FC<RowProps> = ({ children, confidence, isOpen, className: classNameProps }) => {
  const className = classNames({
    [Style.row]: true,
    [Style.open]: isOpen
  });
  return (
    <div className={`${className} ${classNameProps}`}>
      {children}
      <div className={Style.background} style={{ width: `${100 * confidence / 10}%` }}></div>
    </div>
  );
}
