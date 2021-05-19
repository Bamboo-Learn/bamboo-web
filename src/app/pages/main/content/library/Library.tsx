import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BSON } from 'realm-web';

import { strCompare, DBPhraseInterface } from 'app/helpers'; // makeNewPhrase, Phrase
import { PageHeader, PageBody, PageHeaderTitle, PageHeaderActions, Button } from 'app/elements';
import { appendPhrases, Filter as FilterInterface, Library as LibraryInterface } from 'app/redux';

import { Filter, EditOverlay } from '../../components';
import { RowAddNew, RowPhrase, RowLoadMore } from './phrases-table'; // TableHeader
import Style from './style.module.css';

type LibraryProps = {
  filter: FilterInterface
  library: LibraryInterface
}

const RawLibrary = (props: LibraryProps) => {

  const [editPhraseID, setEditPhraseID] = useState<BSON.ObjectID | null | 'NEW'>(null);
  const history = useHistory();

  const displayPhrases = (() => {
    // filters phrases based on the global filter
    const { filter: { orderBy, order }, library: { phrases } } = props; // page, perPage
    const displayPhrases = phrases.sort((a: DBPhraseInterface, b: DBPhraseInterface) => (
      order * strCompare(a[orderBy], b[orderBy])
    )); // .slice(page * perPage, (page + 1) * perPage);
    return displayPhrases;
  })();

  const redirectToStudy = () => {
    history.push(`/study`);
  }

  return (
    <>
      <EditOverlay editPhraseID={editPhraseID} onClose={() => setEditPhraseID(null)} />
      <PageHeader>
        <PageHeaderTitle>{'Library'}</PageHeaderTitle>
        <PageHeaderActions>
          <Button size="sm" icon="Add" onClick={() => setEditPhraseID('NEW')}>{'New'}</Button>
          <Button size="sm" icon="Autofill" color="orange" onClick={redirectToStudy}>{'Study'}</Button>
        </PageHeaderActions>
      </PageHeader>
      {/* make this take a button */}
      <PageBody>
        <Filter />
        {/* <TableHeader filter={filter} /> */}
        <div className={Style.tableBody}>
          <RowAddNew editPhraseID={editPhraseID} />
          {
            displayPhrases.map((phrase) => (
              <RowPhrase
                key={phrase._id.toHexString()}
                phrase={phrase}
                setEditPhraseID={setEditPhraseID}
              />
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
  // updateFilter: ()
});

const Library = connect(
  null,
  mapDispatchToProps
)(RawLibrary);

export { Library };