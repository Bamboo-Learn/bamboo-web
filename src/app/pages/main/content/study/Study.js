import React from 'react';

import { PageHeader } from 'app/elements';

// TODO: import filter so user can change what they're studying
// turn search off in this filter

class Study extends React.Component {
  render() {
    return (
      <>
        <PageHeader>{'Study'}</PageHeader>
      </>
    );
  }
}

export { Study }