import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { strCompare, DBPhraseInterface } from 'app/helpers';
import { PageHeader, PageBody, PageHeaderTitle, PageHeaderActions, Button } from 'app/elements';
import { appendPhrases, Filter as FilterInterface, Library as LibraryInterface } from 'app/redux';

import { Filter } from '../../components/filter/Filter.js';
import { RowAddNew, RowPhrase, RowLoadMore } from './phrases-table'; // TableHeader
import Style from './style.module.css';
import EditOverlay from '../../components/edit-overlay/EditOverlay.js';

type LibraryProps = {
  filter: FilterInterface
  library: LibraryInterface
}

const RawLibrary = (props: LibraryProps) => {

  // TODO: use an _id, which can be set to NEW to be NEW, or '' to be not currently editing
  // pull the _id from the library
  const [editPhraseID, setEditPhraseID] = useState('');
  const history = useHistory();

  const displayPhrases = (() => {
    // filters phrases based on the global filter
    const { filter: { orderBy, order }, library: { phrases } } = props; // page, perPage
    const displayPhrases = [...phrases].sort((a: DBPhraseInterface, b: DBPhraseInterface) => (
      order * strCompare(a.original[orderBy], b.original[orderBy])
    )); // .slice(page * perPage, (page + 1) * perPage);
    return displayPhrases;
  })();

  const redirectToStudy = () => {
    history.push(`/study`)
  }

  return (
    <>
      <EditOverlay editPhrase={editPhraseID} setEditPhraseID={setEditPhraseID} />
      <PageHeader>
        <PageHeaderTitle>{'Library'}</PageHeaderTitle>
        <PageHeaderActions>
          <Button size="sm" icon="Add" onClick={setEditPhraseID('NEW')}>{'New'}</Button>
          <Button size="sm" icon="Autofill" color="orange" onClick={redirectToStudy}>{'Study'}</Button>
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
              <RowPhrase key={phrase._id.toHexString()} phrase={phrase} />
            ))
          }
          <RowLoadMore />
        </div>
      </PageBody>
    </>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  appendPhrases: (newPhrases: DBPhraseInterface[]) => {
    dispatch(appendPhrases(newPhrases))
  }
});

const Library = connect(
  null,
  mapDispatchToProps
)(RawLibrary);

export { Library };