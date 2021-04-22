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

    // check if we are logged in, if not redirect
    // do this before the component mounts to avoid seeing any elements
    this.redirectIfNotLoggedIn();
  }

  redirectIfNotLoggedIn() {
    const { mongodb } = this.props;
    if (!mongodb || !mongodb.isLoggedIn()) {
      window.location = '/login';
    }
  }

  componentDidMount() {
    this.confirmLogin();
  }

  confirmLogin() {
    const { mongodb } = this.props;
    if (mongodb.isLoggedIn()) {
      mongodb.loadUserData().then(data => {
        this.setState({
          userData: data,
          isSplashOverlayOpen: false
        });
      });
    }
    // TODO: wait for initial phrases to load before removing splash
  }

  render() {
    const { mongodb } = this.props;
    const { isSplashOverlayOpen } = this.state;
    return (
      <>
        <Splash isSplashOverlayOpen={isSplashOverlayOpen} />
        <Sidebar mongodb={mongodb} />
        <Content mongodb={mongodb} />
      </>
    );
  }
}

export { Main };
