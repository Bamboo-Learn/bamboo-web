import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { Logo } from 'app/elements';
import { ChromeWebStoreLink } from 'app/helpers';

import Style from './style.module.css';

// const PAGE_IDS = [
//   'library',
//   'my-packs',
//   'public-packs',
//   'study',
//   'settings'
// ];

const SidebarItem = ({ onClick, label, name, isActive }) => (
  <div className={`${Style.sidebarItem} ${isActive ? Style.active : ''}`} name={name} onClick={onClick}>
    {label}
  </div>
);

class RawSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.logout = this.logout.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.closeSidebar = this.closeSidebar.bind(this);
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

  closeSidebar() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { isOpen } = this.state;
    const { pageID } = this.props.match.params;
    // TODO: what if this is not in PAGE_IDS
    return (
      <div className={Style.sidebar}>
        <div className={Style.sidebarToggle} onClick={this.toggleSidebar} />
        <div className={`${Style.sidebarPanel} ${!isOpen ? Style.closed : ''}`}>
          <Logo className={Style.headerLogo} />
          <div className={Style.sidebarItems}>
            <Link to="/library">
              <SidebarItem label="Library" isActive={!pageID || pageID === 'library'} onClick={this.closeSidebar} />
            </Link>
            <Link to="/my-packs">
              <SidebarItem label="My Packs" isActive={pageID === 'my-packs'} onClick={this.closeSidebar} />
            </Link>
            <Link to="/public-packs">
              <SidebarItem label="Public Packs" isActive={pageID === 'public-packs'} onClick={this.closeSidebar} />
            </Link>
            <Link to="/study-mode">
              <SidebarItem label="Study Mode" isActive={pageID === 'study-mode'} onClick={this.closeSidebar} />
            </Link>
          </div>
          <div className={Style.sidebarFooter}>
            <SidebarItem label="Add To Chrome" onClick={this.openChromeStore} />
            <Link to="/settings">
              <SidebarItem label="Settings" isActive={pageID === 'settings'} onClick={this.closeSidebar} />
            </Link>
            <SidebarItem label="Logout" onClick={this.logout} />
          </div>
        </div >

      </div>
    );
  }
}

const Sidebar = withRouter(RawSidebar);

export { Sidebar };