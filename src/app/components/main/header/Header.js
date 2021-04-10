import React from 'react';

import { DEFAULT_PHRASE } from '../../../helpers';
import { Button, Loading, Logo } from '../../../elements';
import { ChromeWebStoreLink } from '../../../helpers';

import Style from './style.module.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.setEditPhraseToNewPhrase = this.setEditPhraseToNewPhrase.bind(this);
    this.logout = this.logout.bind(this);
    this.openChromeStore = this.openChromeStore.bind(this);
  }

  setEditPhraseToNewPhrase() {
    const userID = this.props.mongodb.userID();
    const defaultPhrase = DEFAULT_PHRASE(userID);
    this.props.setEditPhrase(defaultPhrase);
  }

  logout() {
    this.props.mongodb.logout();
  }

  openChromeStore() {
    window.open(ChromeWebStoreLink, '_blank');
  }

  render() {
    return (
      <Loading
        color="white"
        style={{
          zIndex: 11,
          position: 'absolute'
        }}
        isLoading={this.props.isLoading}
      >
        <div className={Style.Header}>
          <Logo />
          <div className={Style.AddNewButtonHolder}>
            <Button
              icon="Logout"
              onClick={() => this.logout()}
              hidden={!this.props.isLoggedIn}
              color="dark-green"
              label="Logout"
              doubleClick={true}
              tab={false}
            />

            {/* <Button
							className={Style.OpenChromeStore}
							icon="Install"
							onClick={() => this.openChromeStore()}
							hidden={!this.props.isLoggedIn}
							color="dark-green"
							label="Install"
							tab={false}
						/> */}

            <Button
              icon="Add"
              onClick={this.setEditPhraseToNewPhrase}
              hidden={!this.props.isLoggedIn}
              color="dark-green"
              label="New"
              tab={false}
            />
          </div>
        </div>
      </Loading>
    );
  }
}

export default Header;