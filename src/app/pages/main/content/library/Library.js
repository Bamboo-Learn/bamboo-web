import React from 'react';
import { connect } from 'react-redux';

import { strCompare } from 'app/helpers';
import { PageHeader, PageBody, PageHeaderTitle, PageHeaderActions, Button } from 'app/elements';
import { appendPhrases } from 'app/redux';

import { Filter } from '../../components/filter/Filter.js';
import { RowAddNew, RowPhrase, RowLoadMore } from './phrases-table'; // TableHeader
import Style from './style.module.css';

class RawLibrary extends React.Component {
  displayPhrases() {
    // filters phrases based on the global filter
    const { filter: { orderBy, order }, library: { phrases } } = this.props; // page, perPage
    const displayPhrases = [...phrases].sort((a, b) => (
      order * strCompare(a.original[orderBy], b.original[orderBy])
    )); // .slice(page * perPage, (page + 1) * perPage);
    return displayPhrases;
  }

  render() {
    const displayPhrases = this.displayPhrases();

    return (
      <>
        <PageHeader>
          <PageHeaderTitle>{'Library'}</PageHeaderTitle>
          <PageHeaderActions>
            <Button>{'Study'}</Button>
            <Button>{'Add New'}</Button>
          </PageHeaderActions>
        </PageHeader>
        {/* make this take a button */}
        <PageBody>
          <Filter />
          {/* <TableHeader filter={filter} /> */}
          <div className={Style.tableBody}>
            <RowAddNew />
            {
              displayPhrases.map((phrase) => (
                <RowPhrase key={phrase._id} phrase={phrase} />
              ))
            }
            <RowLoadMore />
          </div>
        </PageBody>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appendPhrases: (newPhrases) => {
    dispatch(appendPhrases(newPhrases))
  }
});

const Library = connect(
  null,
  mapDispatchToProps
)(RawLibrary);

export { Library };