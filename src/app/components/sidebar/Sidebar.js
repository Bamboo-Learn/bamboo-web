import React from 'react';

import { Logo } from 'app/elements';

import Style from './style.module.css';

class Sidebar extends React.Component {
  render() {
    const { isOpen } = this.props;
    return (
      <div className={`${Style.sidebar} ${!isOpen ? 'closed' : ''}`}>
        <Logo className={Style.headerLogo} />
        <div className={Style.sidebarItem} onClick={() => { }}>
          My Packs
        </div>
        <div className={Style.sidebarItem} onClick={() => { }}>
          Public Packs
        </div>
        <div className={Style.sidebarItem} onClick={() => { }}>
          Study Mode
        </div>
        <div className={Style.sidebarItem} onClick={() => { }}>
        </div>
        <div className={Style.sidebarFooter}>
          <div className={Style.sidebarItem} onClick={() => { }}>
            Add To Chrome
          </div>
          <div className={Style.sidebarItem} onClick={() => { }}>
            Settings
          </div>
          <div className={Style.sidebarItem} onClick={() => { }}>
            Logout
          </div>
        </div>
      </div>
    );
  }
}

export { Sidebar };