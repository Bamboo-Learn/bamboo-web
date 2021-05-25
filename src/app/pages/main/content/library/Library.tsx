import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BSON } from 'realm-web';
import { List } from 'immutable';

import { compare, DBPhraseInterface, Phrase } from 'app/helpers'; // makeNewPhrase, Phrase
import { PageHeader, PageBody, PageHeaderTitle, PageHeaderActions, Button } from 'app/elements';
import { appendPhrases, updateFilter, FilterStateType, LibraryStateType } from 'app/redux';

import { Filter, EditOverlay } from '../../components';
import { RowAddNew, RowPhrase, RowLoadMore, TableHeader } from './phrases-table';
import Style from './style.module.css';

type LibraryProps = {
  filter: FilterStateType
  library: LibraryStateType
}

const RawLibrary = (props: LibraryProps) => {

  const [editPhraseID, setEditPhraseID] = useState<BSON.ObjectID | null | 'NEW'>(null);
  const history = useHistory();

  const displayPhrases: List<Phrase> = (() => {
    // filters phrases based on the global filter
    const { filter: { orderBy, order }, library: { phrases } } = props; // page, perPage
    const displayPhrases = phrases.sort((a: DBPhraseInterface, b: DBPhraseInterface) => (
      order * compare(a[orderBy], b[orderBy])
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
          <Button size="sm" icon="add" className={Style.buttonHiddenLarge} onClick={() => setEditPhraseID('NEW')}>{'New'}</Button>
          <Button size="sm" icon="study" color="orange" onClick={redirectToStudy}>{'Study'}</Button>
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
  },
  updateFilter: ({ filter }: { filter: FilterStateType }) => {
    dispatch(updateFilter({ filter }))
  }
});

const Library = connect(
  null,
  mapDispatchToProps
)(RawLibrary);

export { Library };