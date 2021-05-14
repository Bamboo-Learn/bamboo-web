import React, { FC } from 'react';

import Style from './style.module.scss';

type ColProps = {
  children?: JSX.Element | JSX.Element[],
  className?: string,
  style?: any
};

const Col: FC<ColProps> = ({ children, className, style }) => {
  return (
    <div className={`${Style.col} ${className}`} style={style}>
      {children}
    </div>
  );
}

export { Col };