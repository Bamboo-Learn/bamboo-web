import React from 'react';

import { Logo } from 'app/elements';
import { ChromeWebStoreLink } from 'app/helpers';

import Style from './style.module.css';

const SidebarItem = ({ onClick, label, name, isActive }) => (
  <div className={`${Style.sidebarItem} ${isActive ? Style.active : ''}`} name={name} onClick={onClick}>
    {label}
  </div>
);

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.logout = this.logout.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.switchPage = this.switchPage.bind(this);
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

  switchPage(pageID) {
    const { switchPageCallback } = this.props;
    switchPageCallback(pageID);
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { isOpen } = this.state;
    const { pageID } = this.props;
    return (
      <div className={Style.sidebar}>
        <div className={Style.sidebarToggle} onClick={this.toggleSidebar} />
        <div className={`${Style.sidebarPanel} ${!isOpen ? Style.closed : ''}`}>
          <Logo className={Style.headerLogo} />
          <div className={Style.sidebarItems}>
            <SidebarItem label="Library" isActive={pageID === 'library'} onClick={() => this.switchPage('library')} />
            <SidebarItem label="My Packs" isActive={pageID === 'my-packs'} onClick={() => this.switchPage('my-packs')} />
            <SidebarItem label="Public Packs" isActive={pageID === 'public-packs'} onClick={() => this.switchPage('public-packs')} />
            <SidebarItem label="Study Mode" isActive={pageID === 'study-mode'} onClick={() => this.switchPage('study-mode')} />
          </div>
          <div className={Style.sidebarFooter}>
            <SidebarItem label="Add To Chrome" onClick={this.openChromeStore} />
            <SidebarItem label="Settings" isActive={pageID === 'settings'} onClick={() => this.switchPage('settings')} />
            <SidebarItem label="Logout" onClick={this.logout} />
          </div>
        </div >

      </div>
    );
  }
}

export { Sidebar };