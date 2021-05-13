import React, { FC } from 'react'

import LogoImg from './logo.png';
import LogoImgGreen from './logo-green.png';
import Style from './style.module.css';

type LogoProps = {
  color: string,
  className: string,
  style: any
}

export const Logo: FC<LogoProps> = ({ color, className, style }) => {
  const img = (color === 'green') ? LogoImgGreen : LogoImg;
  return (
    <img
      className={`${Style.Logo} ${className}`}
      style={style}
      src={img}
      alt="Bamboo"
    />
  );
};