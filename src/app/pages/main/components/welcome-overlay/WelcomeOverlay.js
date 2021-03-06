
import React from 'react';

import { Popup } from 'app/elements';
import { ChromeWebStoreLink } from 'app/classes';

import Style from './style.module.css';

class WelcomeOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    }

    this.close = this.close.bind(this);
  }

  close() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (!isChrome) {
      // if this isn't Chrome then don't show this
      return null;
    }
    return (
      <Popup
        id="bamboo-welcome-overlay" // if Bamboo is installed and running, it auto hides using this id
        title="Email confirmed!"
        action="Install Chrome Extension"
        onSubmit={() => window.open(ChromeWebStoreLink, '_blank')}
        isOpen={this.state.isOpen}
        onClose={this.close}
      >
        <div className={Style.message}>{'Welcome to Bamboo! You can now set up Bamboo in Chrome.'}</div>
        {/* <Slideshow /> */}
        <p
          className={Style.additional}
          onClick={this.close}
        >
          {'Continue to web app'}
        </p>
      </Popup>
    );
  }
}

export default WelcomeOverlay;