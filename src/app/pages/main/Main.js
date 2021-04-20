import React from 'react';

import { Splash } from 'app/elements';
import { Sidebar } from 'app/components'

import { Content } from './content/Content.js';
// import EditOverlay from './edit-overlay/EditOverlay.js'; // TODO: get rid of this
// FIXME: uncomment this just debugging FIXME: import WelcomeOverlay from './welcome-overlay/WelcomeOverlay.js';

// import Style from './style.module.css';

const PAGE_IDS = [
  'library',
  'my-packs',
  'public-packs',
  'study',
  'settings'
];

// TODO: TODO: TODO: add redux here so we can switch pages wherever?

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSplashOverlayOpen: true,
      pageID: PAGE_IDS[0]
    }

    this.closeSplashOverlay = this.closeSplashOverlay.bind(this);
    this.switchPageCallback = this.switchPageCallback.bind(this);

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
      this.setState({
        needsLoad: true,
        isLoggedIn: true
      });
    }
    // TODO: wait for initial phrases to load before removing splash
    this.closeSplashOverlay();
  }

  closeSplashOverlay() {
    this.setState({
      isSplashOverlayOpen: false
    });
  }

  switchPageCallback(pageID) {
    this.setState({
      pageID
    });
  }

  render() {
    const { mongodb } = this.props;
    const { pageID } = this.state;
    return (
      <div>
        <Splash isSplashOverlayOpen={this.state.isSplashOverlayOpen} />
        <Sidebar mongodb={mongodb} switchPageCallback={this.switchPageCallback} pageID={pageID} />
        <Content mongodb={mongodb} pageID={pageID} />
      </div>
    );
  }
}

export default Main;
