import React from 'react';
import { connect } from 'react-redux';

import { strCompare } from 'app/helpers';
import { PageHeader, PageBody } from 'app/elements';
import { appendPhrases, updateFilter } from 'app/redux';

import { TableHeader } from './table-header/TableHeader.js'
import { RowAddNew, RowPhrase } from './row-phrase'

class RawLibrary extends React.Component {

  componentDidMount() {
    this.loadPhrases();
  }

  async loadPhrases() {

    // get the new phrases and add them to the phrases
    const { mongodb, filter } = this.props;
    const loadedPhrases = await mongodb.getPhrases(filter);
    this.props.appendPhrases(loadedPhrases);

    // set needs load to false
    // this.props.setNeedsLoad(false);
  }

  displayPhrases() {
    // filters phrases based on the global filter
    const { filter: { orderBy, reverse, page, perPage }, library: { phrases } } = this.props;
    return phrases;
    // return phrases.sort((a, b) => {
    //   const order = strCompare(a.original[orderBy], b.original[orderBy]);
    //   return (reverse) ? -1 * order : order;
    // }).slice(page * perPage, (page + 1) * perPage);
  }

  render() {
    const { updateFilter, filter, mongodb } = this.props;
    const displayPhrases = this.displayPhrases();

    console.log({ displayPhrases });

    return (
      <>
        <PageHeader>Library</PageHeader>
        <PageBody>
          <TableHeader mongodb={mongodb} filter={filter} updateFilter={updateFilter} />
          <div>
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