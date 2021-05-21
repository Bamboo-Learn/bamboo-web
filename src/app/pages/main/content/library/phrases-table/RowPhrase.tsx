
import React, { FC, useState, useEffect } from 'react';
import { BSON } from 'realm-web';
import classNames from 'classnames';

import { Phrase } from 'app/helpers';
import { confidenceBackground, Row, Col, TextCell, TextAreaCell, Button, InputSlider } from 'app/elements';

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

const ColConfidenceSmall: FC<{ confidence: number }> = ({ confidence }) => {
  return (
    <Col className={Style.colConfidenceSmall}>
      <div
        className={`${Style.confidenceBar} noselect`}
        style={confidenceBackground(confidence)}
      >
      </div>
    </Col>
  );
}

// ColLarge

type ColConfidenceLargeProps = {
  confidence: number,
  updateField: (e: any) => void
}

const ColConfidenceLarge: FC<ColConfidenceLargeProps> = ({ confidence, updateField }) => {
  return (
    <Col className={Style.colConfidenceLarge}>
      <InputSlider onChange={updateField} value={confidence} />
    </Col>
  );
}

// Options

type OptionButtonsProps = {
  edit: () => void,
  isEdited: boolean
}

const OptionButtons: FC<OptionButtonsProps> = ({ edit, isEdited }) => {
  if (isEdited) {
    return (
      <>
        <Button size="sm" onClick={() => { }} icon="X" color="grey" doubleClick>{'Cancel'}</Button>
        <Button size="sm" onClick={() => { }} icon="Edit" color="blue" doubleClick>{'Save'}</Button>
      </>

    )
  }
  return (
    <>
      <Button size="sm" onClick={() => { }} icon="Garbage" color="red" doubleClick>{'Delete'}</Button>
      <Button size="sm" onClick={edit} icon="Edit" color="blue">{'Edit'}</Button>
      {/* TODO: don't display edit button on large */}
    </>
  );
}

// RowPhrase

type RowPhraseProps = {
  phrase: Phrase,
  setEditPhraseID: (id: BSON.ObjectID | null | 'NEW') => void // this is for the edit button
}

export const RowPhrase: FC<RowPhraseProps> = ({ phrase: phraseProp, setEditPhraseID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phrase, setPhrase] = useState(phraseProp.toData());

  const toggleIsOpen = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setPhrase(phraseProp.toData());
  }, [phraseProp]);

  const updateField = (e: any) => {
    if (e.target.name === 'confidence') {
      setPhrase({ ...phrase, ...{ confidence: parseFloat(e.target.value) } });
      return;
    }
    setPhrase({ ...phrase, ...{ [e.target.name]: e.target.value } });
  }

  const isEdited = false;

  return (
    <Row confidence={phrase.confidence} isOpen={isOpen} className={Style.rowPhrase}>
      <ColOpenerSmall isOpen={isOpen} onClick={toggleIsOpen} />
      <Col className={Style.colChinese}>
        <TextCell
          className={Style.cellChinese}
          value={phrase.characters}
          name="characters"
          onChange={updateField}
        />
      </Col>
      <ColConfidenceSmall confidence={phrase.confidence} />
      <Col className={Style.colPinyin}>
        <TextCell
          className={Style.cellPinyin}
          value={phrase.pinyin}
          name="pinyin"
          onChange={updateField}
        />
      </Col>
      <Col className={Style.colEnglish}>
        <TextAreaCell
          className={Style.cellEnglish}
          value={phrase.english}
          name="english"
          onChange={updateField}
        />
      </Col>

      <Col className={Style.colOptions}>
        <OptionButtons
          edit={() => setEditPhraseID(phraseProp._id)}
          isEdited={isEdited}
        />
      </Col>


      <ColConfidenceLarge confidence={phrase.confidence} updateField={updateField} />
    </Row>
  );
}


