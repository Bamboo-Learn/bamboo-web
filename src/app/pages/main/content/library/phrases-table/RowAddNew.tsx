
import React, { FC, useState } from 'react';

import { Row, Col, TextCell, TextAreaCell, Button } from 'app/elements';
import { PhraseInterface } from 'app/helpers'

import Style from './style.module.scss';

type RowAddNewProps = {
}

// TODO: this is creating a new phrase so the useState hook of setPhrase
// needs to be 
export const RowAddNew: FC<RowAddNewProps> = () => {

  const [phrase, setPhrase] = useState<PhraseInterface>({
    characters: '',
    confidence: 0,
    pinyin: '',
    english: '',
    category: ''
  });

  const updateField = (e: any) => {
    setPhrase({ ...phrase, ...{ [e.target.name]: e.target.value } });
  }

  return (
    <Row className={`${Style.rowAddNew} ${Style.rowPhrase}`}>

      <Col className={Style.colChinese}>
        <TextCell
          className={Style.cellChinese}
          value={phrase.characters}
          name="characters"
          onChange={updateField}
        />
      </Col>
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
        <Button size="sm" onClick={() => { }} icon="X" color="grey" doubleClick>{'Cancel'}</Button>
        <Button size="sm" onClick={() => { }} icon="Edit" color="blue">{'Save'}</Button>
      </Col>
      {/* <ColConfidenceLarge confidence={confidence} updateField={updateField} /> */}
      {/* ColPackLarge */}
      {/* <ColOptions /> has the options like save and cancel */}
    </Row>
  );
}
