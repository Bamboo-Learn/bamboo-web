
import React from 'react';

import s1 from './img/screenshot-1.png';
import s2 from './img/screenshot-2.png';
import s3 from './img/screenshot-3.png';

import Style from './style.module.css';

export class Slideshow extends React.Component {
  render() {
    return (
      <>
        <div className={Style.Slideshow}>
          <img src={s1} alt="New Tab Page" />
          <img src={s2} alt="New Tab Page Reveal Answer" />
          <img src={s3} alt="Add New Popup" />
        </div>

        <h1 className={Style.title}>Learn Chinese Throughout the Day</h1>
        <p className={Style.body}>
          Bamboo is a simple Chrome Extension that shows you a Chinese character every time you open a new tab.
          Just add characters to your library and browse the web to start learning.
          </p>
        <button onClick={this.openChromeStore}>
          {'Add to Chrome'}
        </button>
      </>
    );
  }
}
