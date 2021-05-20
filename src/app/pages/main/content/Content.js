import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { PageContent } from 'app/elements';

import { Library } from './library';
import { MyPacks, PublicPacks } from './packs';
import { Study } from './study/Study.js';
import { Settings } from './settings/Settings.js';



class RawContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  getPage() {
    const { pageID } = this.props.match.params;

    // eslint-disable-next-line 
    switch (pageID) {
      case 'my-packs':
        return MyPacks;
      case 'public-packs':
        return PublicPacks;
      case 'study':
        return Study;
      case 'settings':
        return Settings;
      case 'library':
      default:
        return Library
    }
  }

  render() {
    const { isLoading } = this.state;
    const Page = this.getPage();
    return (
      <PageContent isLoading={isLoading}>
        <Page {...this.props} />
      </PageContent>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    library: state.library,
    filter: state.filter
  };
};

const Content = connect(mapStateToProps)(withRouter(RawContent));

export { Content }