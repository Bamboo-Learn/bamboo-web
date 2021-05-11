import React from 'react';
import { connect } from 'react-redux';

import { strCompare } from 'app/helpers';
import { PageHeader, PageBody } from 'app/elements';
import { appendPhrases, updateFilter } from 'app/redux';

import { Filter } from './filter/Filter.js';
import { RowAddNew, RowPhrase } from './table'; // TableHeader

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
    const { updateFilter, filter } = this.props;
    const displayPhrases = this.displayPhrases();

    return (
      <>
        <PageHeader>{'Library'}</PageHeader>
        <PageBody>
          <Filter filter={filter} updateFilter={updateFilter} />
          {/* <TableHeader filter={filter} updateFilter={updateFilter} /> */}
          <div className={Style.tableBody}>
            <RowAddNew />
            {
              displayPhrases.map((phrase) => (
                <RowPhrase key={phrase._id} phrase={phrase} />
              ))
            }
          </div>
        </PageBody>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appendPhrases: (newPhrases) => {
    dispatch(appendPhrases(newPhrases))
  },
  updateFilter: ({ filter, mongodb }) => {
    dispatch(updateFilter({ filter, mongodb }))
  }
});

const Library = connect(
  null,
  mapDispatchToProps
)(RawLibrary);

export { Library };