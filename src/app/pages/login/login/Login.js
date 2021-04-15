import React from 'react';

import { Canvas, Logo } from 'app/elements';

import { LoginForm } from './login-form/LoginForm';
import { Display } from './display/Display';
import Style from './style.module.css';

class Login extends React.Component {
  render() {
    const { mongodb } = this.props;
    return (
      <div className={Style.container}>
        <div className={Style.containerLeft}>
          <div className={Style.logoHolder}>
            <Logo className={Style.logo} color="green" />
          </div>
          <div className={Style.containerLeftBody}>
            <h1>Login or Sign Up</h1>
            <p>to start learning Chinese while you browse!</p>
            <LoginForm mongodb={mongodb} />
          </div>
        </div>
        <div className={Style.containerRight}>
          <Display />
        </div>
        <Canvas className={Style.Canvas} />
      </div>
    );
  }
}

export {
  Login
};