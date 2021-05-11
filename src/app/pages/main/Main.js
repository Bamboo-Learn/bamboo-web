import React from 'react';
import { connect } from 'react-redux';

import { Mongodb } from 'app/helpers';
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
    if (!Mongodb.isLoggedIn()) {
      window.location = '/login';
    }
  }

  componentDidMount() {
    this.confirmLogin();
  }

  confirmLogin() {
    const { filter, updateFilter } = this.props;
    if (Mongodb.isLoggedIn()) {
      Mongodb.loadUserData().then(data => {
        this.setState({
          userData: data,
          isSplashOverlayOpen: false
        });
        updateFilter({ filter });
      });
    }
    // TODO: wait for initial phrases to load before removing splash
  }

  render() {
    const { isSplashOverlayOpen } = this.state;
    return (
      <>
        <Splash isSplashOverlayOpen={isSplashOverlayOpen} />
        <Sidebar />
        <Content />
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
  updateFilter: ({ filter }) => {
    dispatch(updateFilter({ filter }))
  }
});

const Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawMain);

export { Main };
