import React, { FC } from 'react';

import Style from './style.module.scss';

type ColProps = {
  children?: JSX.Element | JSX.Element[] | (boolean | Element)[],
  className?: string,
  style?: any,
  onClick?: (e: any) => void
};

const Col: FC<ColProps> = ({ children, className, style, onClick }) => {
  return (
    // TODO: if no onClick, focus child
    <div className={`${Style.col} ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}

export { Col };