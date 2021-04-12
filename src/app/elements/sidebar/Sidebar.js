import React from 'react';

import Style from './style.module.css';

class Sidebar extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={Style.sidebar}>
        {children}
      </div>
    );
  }
}

class SidebarItem extends React.Component {
  render() {
    const { childern, action } = this.props;
    return (
      <div className={Style.sidebarItem} onClick={action}>
        {childern}
      </div>
    );
  }
}

export { Sidebar, SidebarItem };