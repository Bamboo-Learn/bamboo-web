
import React, { FC, useState } from 'react';

import { Row, Col, TextCell, TextAreaCell, Button } from 'app/elements';
import { PhraseInterface, DefaultPhraseData } from 'app/helpers'

import Style from './style.module.scss';

type RowAddNewProps = {
}



// TODO: this is creating a new phrase so the useState hook of setPhrase
// needs to be 
export const RowAddNew: FC<RowAddNewProps> = () => {

  const [phrase, setPhrase] = useState<PhraseInterface>(DefaultPhraseData);

  const updateField = (e: any) => {
    setPhrase({ ...phrase, ...{ [e.target.name]: e.target.value } });
  }

  const cancel = (e: any) => {
    setPhrase(DefaultPhraseData);
  }

  return (
    <Row className={`${Style.rowAddNew} ${Style.rowPhrase}`}>

      <Col className={Style.colChinese}>
        <TextCell
          className={Style.cellChinese}
          value={phrase.characters}
          name="characters"
          onChange={updateField}
          placeholder="新的"
        />
      </Col>
      <Col className={Style.colPinyin}>
        <TextCell
          className={Style.cellPinyin}
          value={phrase.pinyin}
          name="pinyin"
          onChange={updateField}
          placeholder="pinyin"
        />
      </Col>
      <Col className={Style.colEnglish}>
        <TextAreaCell
          className={Style.cellEnglish}
          value={phrase.english}
          name="english"
          onChange={updateField}
          placeholder="english definition"
        />
      </Col>
      <Col className={Style.colOptions}>
        <Button size="sm" onClick={cancel} icon="X" color="grey">{'Cancel'}</Button>
        <Button size="sm" onClick={() => { }} icon="Edit" color="blue">{'Save'}</Button>
      </Col>
      {/* <ColConfidenceLarge confidence={confidence} updateField={updateField} /> */}
      {/* ColPackLarge */}
      {/* <ColOptions /> has the options like save and cancel */}
    </Row>
  );
}
