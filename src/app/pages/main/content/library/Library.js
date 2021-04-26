import React from 'react';
import { connect } from 'react-redux';

import { strCompare } from 'app/helpers';
import { PageHeader, PageBody } from 'app/elements';
import { appendPhrases, updateFilter } from 'app/redux';

import { RowAddNew, RowPhrase, TableHeader } from './table'

class RawLibrary extends React.Component {
  displayPhrases() {
    // filters phrases based on the global filter
    const { filter: { orderBy, reverse, page, perPage }, library: { phrases } } = this.props;
    const displayPhrases = [...phrases].sort((a, b) => {
      const order = strCompare(a.original[orderBy], b.original[orderBy]);
      return (reverse) ? -1 * order : order;
    }); // .slice(page * perPage, (page + 1) * perPage);
    return displayPhrases;
  }

  render() {
    const { updateFilter, filter, mongodb } = this.props;
    const displayPhrases = this.displayPhrases();

    return (
      <>
        <PageHeader>Library</PageHeader>
        <PageBody>
          {/* <TableHeader mongodb={mongodb} filter={filter} updateFilter={updateFilter} /> */}
          <div>
            <RowAddNew mongodb={mongodb} />
            {/* {
              displayPhrases.map((phrase) => (
                <RowPhrase key={phrase._id} phrase={phrase} />
              ))
            } */}
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