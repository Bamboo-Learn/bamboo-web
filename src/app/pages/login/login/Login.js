import React from 'react';

import { Mongodb } from 'app/helpers';
import { Canvas, Logo, Splash } from 'app/elements';

import { LoginForm } from './login-form/LoginForm';
import { Display } from './display/Display';
import Style from './style.module.css';


class Login extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      isSplashOverlayOpen: true,
    }

    // check if we are logged in, if we are, redirect
    // do this before the component mounts to avoid seeing any elements
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (Mongodb.isLoggedIn()) {
      window.location = '/library';
    }
  }

  componentDidMount() {
    this.confirmNotLoggedIn();
  }

  confirmNotLoggedIn() {
    if (!Mongodb.isLoggedIn()) {
      this.setState({
        isSplashOverlayOpen: false
      });
    }
  }


  render() {
    const { isSplashOverlayOpen } = this.state;
    return (
      <>
        <Splash isSplashOverlayOpen={isSplashOverlayOpen} />
        <div className={Style.container}>
          <div className={Style.containerLeft}>
            <div className={Style.logoHolder}>
              <Logo className={Style.logo} color="green" />
            </div>
            <div className={Style.containerLeftBody}>
              <h1>Login or Sign Up</h1>
              <p>to start learning Chinese while you browse!</p>
              <LoginForm />
            </div>
          </div>
          <div className={Style.containerRight}>
            <Display />
          </div>
          <Canvas className={Style.Canvas} />
        </div>
      </>
    );
  }
}

export {
  Login
};