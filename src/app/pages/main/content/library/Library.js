import React from 'react';

import { Phrase, strCompare } from 'app/helpers';
import { PageHeader, PageBody } from 'app/elements';

import { TableHeader } from './table-header/TableHeader.js'
import { RowAddNew, RowPhrase } from './row-phrase'

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phrases: [], // TODO: make this a redux thing where the phrases are global
      filter: {
        perPage: 30,
        orderBy: '',
        reverse: false,
        page: 0,
        search: '',
        pack: ''
      }
    }
  }

  componentDidMount() {
    this.loadPhrases();
  }

  async loadPhrases() {

    // get the new phrases and add them to the phrases
    const { mongodb } = this.props;
    const { filter, phrases: statePhrases } = this.state;
    const phrases = [...statePhrases];
    const loadedPhrases = await mongodb.getPhrases(filter);
    loadedPhrases.forEach((phrase) => {
      const existingPhrase = phrases.find(p => p._id.equals(phrase._id))
      if (!existingPhrase) {
        // if not already in the array then add it
        phrases.push(new Phrase(phrase));
      }
    });

    console.log(phrases);

    // set the phrases to the combinded collection
    this.setState({ phrases });

    // set needs load to false
    // this.props.setNeedsLoad(false);
  }

  displayPhrases() {
    // filters phrases based on the global filter
    const { orderBy, reverse, page, perPage } = this.state.filter;
    const displayPhrases = this.state.phrases
      .sort((a, b) => {
        const order = strCompare(a.original[orderBy], b.original[orderBy]);
        return (reverse) ? -1 * order : order;
      })
      .slice(page * perPage, (page + 1) * perPage);

    return displayPhrases;
  }

  render() {
    const displayPhrases = this.displayPhrases();

    return (
      <>
        <PageHeader>Library</PageHeader>
        <PageBody>
          <TableHeader />
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

export { Library }