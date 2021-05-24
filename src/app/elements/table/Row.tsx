import React, { FC } from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';

type RowProps = {
  className?: string,
  isOpen?: boolean,
  backgroundFill?: number,
}

export const Row: FC<RowProps> = ({ children, backgroundFill, isOpen, className: classNameProps }) => {
  const className = classNames({
    [Style.row]: true,
    [Style.open]: isOpen
  });
  const style = (() => {
    if (!!backgroundFill) {
      const percent = Math.min(100 * Math.abs(backgroundFill), 100);
      return { width: `${percent}%` }
    }
    return {}
  })();
  return (
    <div className={`${className} ${classNameProps}`}>
      {children}
      {
        !!backgroundFill && <div className={Style.backgroundHolder}>
          <div className={Style.background} style={style}></div>
        </div>
      }
    </div>
  );
}
