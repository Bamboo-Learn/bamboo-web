
import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { DBPhrase, Mongodb, isSet } from 'app/classes';
import { progressBackground, Row, Col, CellText, CellTextArea, CellSuggest } from 'app/elements';
import { LibraryActions } from 'app/redux';

import { AutofillCover, ColProgressLarge, ColOptions } from './shared';
import Style from './style.module.scss';

// ColSmall

const ColOpenerSmall: FC<{ isOpen: boolean, onClick: any }> = ({ isOpen, onClick }) => {
  const className = classNames({
    [Style.arrow]: true,
    [Style.open]: isOpen
  })
  return (
    <Col className={Style.colToggleOpen}>
      <div className={`${Style.toggle} noselect`} onClick={onClick}>
        <div className={className}></div>
      </div>
    </Col>
  );
}

const ColProgressSmall: FC<{ progress: number }> = ({ progress }) => {
  return (
    <Col className={Style.colProgressSmall}>
      <div
        className={`${Style.progressBar} noselect`}
        style={progressBackground(progress)}
      >
      </div>
    </Col>
  );
}



// RowPhrase

type RowPhraseProps = {
  phrase: DBPhrase,
  edit: () => void // this is for the edit button
  updatePhrase: (phrase: DBPhrase) => void
  removePhrase: (phrase: DBPhrase) => void
}

const RawRowPhrase: FC<RowPhraseProps> = ({ phrase: phraseProp, edit, removePhrase, updatePhrase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phrase, setPhrase] = useState<DBPhrase>();
  const [enableAutofillFromFocus, setEnableAutofillFromFocus] = useState(false);

  const isEdited = phrase?.isEdited(phraseProp) || false;
  const isSaveable = phrase?.isSaveable(phraseProp) || false;
  const canAutoFill = (enableAutofillFromFocus && phrase?.canAutoFill()) || false;

  useEffect(() => {
    // if the phrase updates, copy it into state
    setPhrase(phraseProp.copy());
  }, [phraseProp]);

  const updateField = (e: any) => {
    if (e.target.name === 'progress') {
      setPhrase(phrase?.set('progress', parseFloat(e.target.value)));
      return;
    }
    setPhrase(phrase?.set(e.target.name, e.target.value));
  }

  const toggleIsOpen = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  const autofill = async () => {
    if (!phrase || !canAutoFill) {
      return;
    }
    // get the pinyin and english for these characters
    const characters = await Mongodb.getCharacters(phrase.characters);

    // edit the phrase to include the new phrases
    const newPhrase = phrase.autofill(characters, {
      pinyin: !isSet(phrase.pinyin),
      english: !isSet(phrase.english)
    });
    setPhrase(newPhrase);
  }

  const cancel = () => {
    setPhrase(phraseProp.copy());
  }

  const cycleStatus = () => {
    setPhrase(phrase?.cycleStatus());
  }

  const remove = async () => {
    if (phrase instanceof DBPhrase) {
      // TODO: start remove animation here (turn the background red)
      await Mongodb.removePhrase(phrase);
      // TODO: finish the animation here (make the row height 0)
      removePhrase(phrase);
    }
  }

  const update = async () => {
    if (!phrase) {
      return;
    }
    await Mongodb.updatePhrase(phrase); // const data =
    // TODO: USE DATA SHAPE: {matchedCount: 1, modifiedCount: 1}
    updatePhrase(phrase);
  }

  if (!phrase) {
    return null;
  }

  return (
    <Row backgroundFill={phrase.progress} isOpen={isOpen} className={Style.rowPhrase}>
      <div className={Style.cover}>
        {/* TODO: RowCover should be in app/elements */}
        <AutofillCover
          visible={canAutoFill}
          pinyin={phrase.pinyin}
          english={phrase.english}
        />
      </div>
      <ColOpenerSmall isOpen={isOpen} onClick={toggleIsOpen} />
      <Col className={Style.colChinese}>
        <CellText
          className={Style.cellChinese}
          value={phrase.characters}
          name="characters"
          onChange={updateField}
          onReturn={autofill}
          onFocus={() => setEnableAutofillFromFocus(true)}
          onBlur={() => setEnableAutofillFromFocus(false)}
        />
      </Col>
      <ColProgressSmall progress={phrase.progress} />
      <Col className={Style.colPinyin}>
        <CellText
          className={Style.cellPinyin}
          value={phrase.pinyin}
          name="pinyin"
          onChange={updateField}
        />
      </Col>
      <Col className={Style.colPack}>
        <CellSuggest
          options={[]}
          value={phrase.pack}
          onChange={updateField}
          name="pack"
        />
      </Col>
      <Col className={Style.colEnglish}>
        <CellTextArea
          className={Style.cellEnglish}
          value={phrase.english}
          name="english"
          onChange={updateField}
        />
      </Col>
      <ColProgressLarge progress={phrase.progress} updateField={updateField} />
      <ColOptions
        edit={edit}
        cancel={cancel}
        remove={remove}
        save={update}
        cycleStatus={cycleStatus}
        progress={phrase.progress}
        isEdited={isEdited}
        isSaveable={isSaveable}
      />

    </Row>
  );
}



const mapDispatchToProps = (dispatch: any) => ({
  removePhrase: (phrase: DBPhrase) => {
    dispatch(LibraryActions.removePhrase(phrase))
  },
  updatePhrase: (phrase: DBPhrase) => {
    dispatch(LibraryActions.updatePhrase(phrase));
  }
});

export const RowPhrase = connect(
  null,
  mapDispatchToProps
)(RawRowPhrase);

