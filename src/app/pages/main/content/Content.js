import React from 'react';

import { Packs } from './packs/Packs.js';
import { Study } from './study/Study.js';
import { Settings } from './settings/Settings.js';

import Style from './style.module.css';

class Content extends React.Component {

  getPage() {
    const { pageID, mongodb } = this.props;
    // eslint-disable-next-line 
    switch (pageID) {
      case 'my-packs':
      case 'public-packs':
        return (<Packs pageID={pageID} mongodb={mongodb} />);
      case 'study':
        return (<Study mongodb={mongodb} />);
      case 'settings':
        return (<Settings mongodb={mongodb} />);
    }
  }

  render() {
    const page = this.getPage();
    return (
      <div className={Style.Content}>
        {page}
      </div>
    );
  }
}

export { Content }