

import React from 'react';

import Style from './style.module.css';

export class Form extends React.Component {
  render() {
    const { children } = this.props

    // render
    return (
      <div className={Style.Form}>
        {children}
      </div>
    );
  }
}

