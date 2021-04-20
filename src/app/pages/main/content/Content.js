import React from 'react';

import { PageContent } from 'app/elements';

import { Library } from './library';
import { MyPacks, PublicPacks } from './packs';
import { Study } from './study/Study.js';
import { Settings } from './settings/Settings.js';

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
      case 'library':
        return (<Library mongodb={mongodb} />)
      case 'my-packs':
        return (<MyPacks mongodb={mongodb} />);
      case 'public-packs':
        return (<PublicPacks mongodb={mongodb} />);
      case 'study-mode':
        return (<Study mongodb={mongodb} />);
      case 'settings':
        return (<Settings mongodb={mongodb} />);
    }
  }

  render() {
    const { isLoading } = this.state;
    const page = this.getPage();
    return (
      <PageContent isLoading={isLoading}>
        {page}
      </PageContent>
    );
  }
}

export { Content }