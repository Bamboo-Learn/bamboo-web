import React from 'react';

import { Canvas, Logo } from '../../../elements';

import { Form } from './form/Form';
import { Slideshow } from './slideshow/Slideshow';
import Style from './style.module.css';

class Login extends React.Component {
  render() {
    return (
      <div className={Style.container}>
        <div className={Style.containerLeft}>
          <div className={Style.logoHolder}>
            <Logo className={Style.logo} color="green" />
          </div>
          <h1>Sign Up or Login</h1>
          <p>to start learning Chinese while you browse!</p>
          <Form />
        </div>
        <div className={Style.containerRight}>
          <Slideshow />
        </div>
        <Canvas
          style={{
            position: 'absolute',
            zIndex: -1
          }}
        />
      </div>
    );
  }
}

export {
  Login
};