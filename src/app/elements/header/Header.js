import React from 'react';

import Style from './style.module.css';

class Header extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={Style.header}>
        {children}
      </div>
    );
  }
}

export { Header };