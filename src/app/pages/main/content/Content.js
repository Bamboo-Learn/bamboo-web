import React from 'react';

// import { Loading } from 'app/elements';

import { Packs } from './packs/Packs.js';
import { Study } from './study/Study.js';
import { Settings } from './settings/Settings.js';
import Style from './style.module.css';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  getPage() {
    const { pageID, mongodb } = this.props;
    // eslint-disable-next-line 
    switch (pageID) {
      case 'my-packs':
      case 'public-packs':
        return (<Packs pageID={pageID} mongodb={mongodb} />);
      case 'study-mode':
        return (<Study mongodb={mongodb} />);
      case 'settings':
        return (<Settings mongodb={mongodb} />);
    }
  }

  render() {
    // const { isLoading } = this.state;
    const page = this.getPage();
    return (
      // <Loading
      //   color="green"
      //   style={{ // TODO: remove style from here
      //     zIndex: 11,
      //     position: 'absolute'
      //   }}
      //   isLoading={isLoading}
      // >
      <div className={Style.content}>
        {page}
      </div>
      // </Loading>
    );
  }
}

export { Content }