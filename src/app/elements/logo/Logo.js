import React from 'react'

import LogoImg from './logo.png';
import LogoImgGreen from './logo-green.png';
import Style from './style.module.css';

class Logo extends React.Component {
  render() {
    const { color, className, style } = this.props;
    const img = (color === 'green') ? LogoImgGreen : LogoImg;
    return (
      <img
        className={`${Style.Logo} ${className}`}
        style={style}
        src={img}
        alt="Bamboo"
      />
    );
  }
}

export { Logo }