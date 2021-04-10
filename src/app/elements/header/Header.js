import React from 'react';
import './Header.css';
import Logo from './logo.png';
import { DEFAULT_PHRASE } from '../../helpers';
import { Button } from '../../elements/button/Button.js';
import { Loading } from '../../elements/loading/Loading.js';


class Header extends React.Component {
  constructor(props) {
    super(props);

    this.setEditPhraseToNewPhrase = this.setEditPhraseToNewPhrase.bind(this);
    this.logout = this.logout.bind(this);
  }

  setEditPhraseToNewPhrase() {
    const userID = this.props.mongodb.userID();
    const defaultPhrase = DEFAULT_PHRASE(userID);
    this.props.setEditPhrase(defaultPhrase);
  }

  logout() {
    this.props.mongodb.logout();
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
          <img
            className={Style.Logo}
            src={Logo}
            alt="Bamboo"
          />
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