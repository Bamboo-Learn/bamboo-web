import React from 'react';

import { Mongodb } from 'app/helpers';

import { Container, ContainerLeft, ContainerRight, Display } from '../components';
import { LoginForm } from './login-form/LoginForm';

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
        <Container isSplashOverlayOpen={isSplashOverlayOpen}>
          <ContainerLeft>
            <h1>{'Login or Sign Up'}</h1>
            <p>{'to start learning Chinese while you browse!'}</p>
            <LoginForm />
          </ContainerLeft>
          <ContainerRight>
            <Display />
          </ContainerRight>
        </Container>
      </>
    );
  }
}

export {
  Login
};