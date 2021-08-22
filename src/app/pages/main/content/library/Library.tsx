import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BSON } from 'realm-web';
import { List } from 'immutable';

import { compare, DBPhraseInterface, DBPhrase } from 'app/classes'; // makeNewPhrase, Phrase
import { PageHeader, PageBody, PageHeaderTitle, PageHeaderActions, Button } from 'app/elements';
import { FilterStateType, LibraryStateType, ReducerStateType } from 'app/redux';

import { Filter, EditOverlay } from '../../components';
import { RowAddNew, RowPhrase, RowLoadMore, TableHeader } from './phrases-table';
import Style from './style.module.css';

type LibraryProps = {
  filter: FilterStateType
  library: LibraryStateType
}

const RawLibrary = ({ filter: { orderBy, order }, library: { phrases, lastLoadedPhraseID } }: LibraryProps) => { // page, perPage

  const [editPhraseID, setEditPhraseID] = useState<BSON.ObjectID | null | 'NEW'>(null);
  const history = useHistory();

  const displayPhrases: List<DBPhrase> = (() => {
    // filters phrases based on the global filter
    const displayPhrases = phrases.sort((a: DBPhraseInterface, b: DBPhraseInterface) => (
      order * compare(a[orderBy], b[orderBy])
    )); // .slice(page * perPage, (page + 1) * perPage);
    return displayPhrases;
  })();

  const redirectToStudy = () => {
    history.push(`/study`);
  }

  const loadMoreRowIndex: number = (lastLoadedPhraseID) ?
    displayPhrases.findIndex(p => p._id.equals(lastLoadedPhraseID)) :
    displayPhrases.size - 1;

  return (
    <>
      <EditOverlay editPhraseID={editPhraseID} onClose={() => setEditPhraseID(null)} />
      <PageHeader>
        <PageHeaderTitle>{'Library'}</PageHeaderTitle>
        <PageHeaderActions>
          <Button size="sm" icon="study" color="orange" onClick={redirectToStudy}>{'Study'}</Button>
          <Button size="sm" icon="add" className={Style.buttonHiddenLarge} onClick={() => setEditPhraseID('NEW')}>{'New'}</Button>
        </PageHeaderActions>
      </PageHeader>
      {/* make this take a button */}
      <PageBody>
        <Filter />
        <TableHeader />
        <div className={Style.tableBody}>
          <RowAddNew />
          {
            displayPhrases.map((phrase) => (
              <RowPhrase
                key={phrase._id.toHexString()}
                phrase={phrase}
                edit={() => setEditPhraseID(phrase._id)}
              />
            )).insert(loadMoreRowIndex + 1, <RowLoadMore key="RowLoadMore" />)
          }
        </div>
      </PageBody>
    </>
  );
}

const mapStateToProps = (state: ReducerStateType) => {
  return {
    filter: state.filter,
    library: state.library
  };
};

export const Library = connect(
  mapStateToProps
)(RawLibrary);

