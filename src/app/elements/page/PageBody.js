import React from 'react';

import Style from './style.module.css'

class PageBody extends React.Component {
  render() {
    const { children, className } = this.props;
    return (
      <div className={`${Style.pageBody} ${className}`}>
        {children}
      </div>
    );
  }
}

export { PageBody }