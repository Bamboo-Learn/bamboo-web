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
            <Logo className={Style.logo} />
          </div>

          <h1>Login or Sign Up</h1>
          <p>Start learning Chinese!</p>

          <Form />
        </div>
        <div className={Style.containerRight}>
          <Slideshow />
          <h1>Learn Chinese Throughout the Day</h1>
          <p>
            Bamboo is a simple Chrome Extension that shows you a Chinese character every time you open a new tab.
            Just add characters to your library and browse the web to start learning.
          </p>
          <p>Add To Chrome Button Here
            <span onClick={this.openChromeStore}>
              {'Add to Chrome'}
            </span>
          </p>
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