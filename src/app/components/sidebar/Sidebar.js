import React from 'react';

import { Logo } from 'app/elements';
import { ChromeWebStoreLink } from 'app/helpers';

import Style from './style.module.css';

const SidebarItem = ({ onClick, label }) => (
  <div className={Style.sidebarItem} onClick={onClick}>
    {label}
  </div>
);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    }

    this.logout = this.logout.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  openChromeStore() {
    window.open(ChromeWebStoreLink, '_blank');
  }

  logout() {
    const { mongodb } = this.props;
    mongodb.logout();
  }

  render() {
    const { isOpen } = this.state;
    return (
      <div className={Style.sidebar}>
        <div className={Style.sidebarToggle} onClick={this.toggleSidebar} />
        <div className={`${Style.sidebarPanel} ${!isOpen ? Style.closed : ''}`}>
          <Logo className={Style.headerLogo} />
          <div className={Style.sidebarItems}>
            <SidebarItem label="My Packs" onClick={() => { }} />
            <SidebarItem label="Public Packs" onClick={() => { }} />
            <SidebarItem label="Study Mode" onClick={() => { }} />
          </div>
          <div className={Style.sidebarFooter}>
            <SidebarItem label="Add To Chrome" onClick={this.openChromeStore} />
            <SidebarItem label="Settings" onClick={() => { }} />
            <SidebarItem label="Logout" onClick={this.logout} />
          </div>
        </div >

      </div>
    );
  }
}

export { Sidebar };