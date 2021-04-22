import React from 'react';

import { Splash } from 'app/elements';
import { Sidebar } from 'app/components'

import { Content } from './content/Content.js';
// import EditOverlay from './edit-overlay/EditOverlay.js'; // TODO: get rid of this
// FIXME: uncomment this just debugging FIXME: import WelcomeOverlay from './welcome-overlay/WelcomeOverlay.js';

// import Style from './style.module.css';

// TODO: TODO: TODO: add redux here so we can switch pages wherever?

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSplashOverlayOpen: true,
    }

    this.closeSplashOverlay = this.closeSplashOverlay.bind(this);

    // check if we are logged in, if not redirect
    // do this before the component mounts to avoid seeing any elements
    this.isLoggedIn();
  }

  componentDidMount() {
    this.confirmLogin();
  }

  // TODO: rename this and remove instance of it being used in logic?, a false will always redirect
  isLoggedIn() {
    const { mongodb } = this.props;
    if (!mongodb || !mongodb.isLoggedIn()) {
      window.location = '/login';
      return false;
    }
    return true;
  }

  confirmLogin() {
    const { mongodb } = this.props;
    if (mongodb.isLoggedIn()) {
      mongodb.loadUserData().then(data => {
        this.setState({
          userData: data
        });
        this.closeSplashOverlay();
      });
    }
    // TODO: wait for initial phrases to load before removing splash
  }

  closeSplashOverlay() {
    this.setState({
      isSplashOverlayOpen: false
    });
  }

  render() {
    const { mongodb } = this.props;
    return (
      <div>
        <Splash isSplashOverlayOpen={this.state.isSplashOverlayOpen} />
        <Sidebar mongodb={mongodb} />
        <Content mongodb={mongodb} />
      </div>
    );
  }
}

export { Main };
