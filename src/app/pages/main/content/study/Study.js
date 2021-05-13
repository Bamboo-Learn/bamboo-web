import React from 'react';

import { PageBody, PageHeader } from 'app/elements';

import { Filter } from '../../components/filter/Filter.js';

class Study extends React.Component {
  render() {
    return (
      <>
        <PageHeader>{'Study'}</PageHeader>
        <PageBody>
          <Filter mode={'study'} />
        </PageBody>
      </>
    );
  }
}

export { Study }