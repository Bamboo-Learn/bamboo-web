import React, { FC } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

type RowProps = {
  className?: string,
  isOpen?: boolean,
  confidence?: number,
}

// TODO: rename confidence here to loadPercent because this 
// shouldn't have biz logic
export const Row: FC<RowProps> = ({ children, confidence, isOpen, className: classNameProps }) => {
  const className = classNames({
    [Style.row]: true,
    [Style.open]: isOpen
  });
  const style = (() => {
    if (!!confidence) {
      const percent = Math.min(100 * Math.abs(confidence), 100);
      return { width: `calc(${percent}% - 8px)` }
    }
    return {}
  })();
  return (
    <div className={`${className} ${classNameProps}`}>
      {children}
      <div className={Style.background} style={style}></div>
    </div>
  );
}
