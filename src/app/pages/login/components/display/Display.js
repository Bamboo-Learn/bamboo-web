
import React from 'react';

import { Button } from 'app/elements';
import { ChromeWebStoreLink } from 'app/helpers';

import Style from './style.module.css';

export class Display extends React.Component {
  constructor(props) {
    super(props);

    this.openChromeStore = this.openChromeStore.bind(this);
  }

  openChromeStore() {
    window.open(ChromeWebStoreLink, '_blank');
  }

  render() {
    return (
      <div className={Style.display}>
        <h1 className={Style.title}>Learn Chinese Throughout the Day</h1>
        <p className={Style.body}>
          Bamboo is a simple Chrome Extension that shows you a Chinese character every time you open a new tab.
          Just add characters to your library and browse the web to start learning.
          </p>
        <Button
          size={'large'}
          color={'orange'}
          onClick={this.openChromeStore}
          className={Style.button}
        >
          {'Add to Chrome'}
        </Button>
      </div>
    );
  }
}
