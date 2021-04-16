import React from 'react';

import { PageHeader, PageBody } from 'app/elements';

import Style from './style.module.css'

class PublicPacks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phrases: []
    }
  }

  componentDidMount() {
    // const { pageID, mongodb } = this.props;
  }

  render() {
    return (
      <>
        <PageHeader>Public Packs</PageHeader>
        <PageBody className={Style.packList}>
        </PageBody>
      </>
    );
  }
}

export { PublicPacks }