import React from 'react'

import LogoImg from './logo.png';
import Style from './style.module.css';

class Logo extends React.Component {
  render() {
    return (
      <img
        className={`${Style.Logo} ${this.props.className}`}
        style={this.props.style}
        src={LogoImg}
        alt="Bamboo"
      />
    );
  }
}

export { Logo }