import React from 'react';

import { PageHeader, PageBody } from 'app/elements';

import { Pack, NewPack } from './pack';
import Style from './style.module.css';

class MyPacks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      packs: []
    }
  }

  componentDidMount() {
    // const { mongodb } = this.props;
  }

  render() {
    const { packs } = this.state;
    return (
      <>
        <PageHeader>My Packs</PageHeader>
        <PageBody className={Style.packList}>
          <NewPack />
          {
            packs.map(({ name, cardCount }) => (
              <Pack name={name} cardCount={cardCount} />
            ))
          }
          <Pack name={'Unlabled'} cardCount={100} />
          <Pack name={'All'} cardCount={364} />
        </PageBody>
      </>
    );
  }
}

export { MyPacks }