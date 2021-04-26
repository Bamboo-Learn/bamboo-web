import React from 'react';
import { connect } from 'react-redux';

import { Splash } from 'app/elements';
import { updateFilter } from 'app/redux';

import { Sidebar } from './components';
import { Content } from './content/Content.js';
// import EditOverlay from './edit-overlay/EditOverlay.js'; // TODO: get rid of this
// FIXME: uncomment this just debugging FIXME: import WelcomeOverlay from './welcome-overlay/WelcomeOverlay.js';

// import Style from './style.module.css';

// TODO: TODO: TODO: add redux here so we can switch pages wherever?

class RawMain extends React.Component {
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
    const { mongodb, filter, updateFilter } = this.props;
    if (mongodb.isLoggedIn()) {
      mongodb.loadUserData().then(data => {
        this.setState({
          userData: data,
          isSplashOverlayOpen: false
        });
        updateFilter({ filter, mongodb });
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

const mapStateToProps = state => {
  return {
    settings: state.settings,
    library: state.library,
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => ({
  updateFilter: ({ filter, mongodb }) => {
    dispatch(updateFilter({ filter, mongodb }))
  }
});

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawMain);

export { Main };
