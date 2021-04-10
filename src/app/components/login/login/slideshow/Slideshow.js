
import React from 'react';

import s1 from './img/screenshot-1.png';
import s2 from './img/screenshot-2.png';
import s3 from './img/screenshot-3.png';

import Style from './style.module.css';

export class Slideshow extends React.Component {
  render() {
    return (
      <div className={Style.Slideshow}>
        <img src={s1} alt="New Tab Page" />
        <img src={s2} alt="New Tab Page Reveal Answer" />
        <img src={s3} alt="Add New Popup" />
      </div>
    );
  }
}
