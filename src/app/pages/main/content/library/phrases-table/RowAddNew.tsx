
import React, { FC, useState } from 'react';

import { Row, Col, TextCell, TextAreaCell, Button } from 'app/elements';
import { makeNewPhrase, Phrase, Mongodb, isSet } from 'app/helpers'

import { AutofillCover } from './AutofillCover';
import Style from './style.module.scss';

type RowAddNewProps = {
}

export const RowAddNew: FC<RowAddNewProps> = () => {

  const [phrase, setPhrase] = useState<Phrase>(makeNewPhrase());
  const [disableAutofillFromFocus, setDisableAutofillFromFocus] = useState(false);

  const canAutoFill = !disableAutofillFromFocus && phrase.canAutoFill();

  const updateField = (e: any) => {
    setPhrase(phrase.set(`${e.target.name}`, e.target.value));
  }

  const cancel = (e: any) => {
    setPhrase(makeNewPhrase());
  }

  const autofill = async () => {
    if (!canAutoFill) {
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

  return (
    <Row className={`${Style.rowAddNew} ${Style.rowPhrase}`}>
      <div className={Style.cover}>
        <AutofillCover
          visible={canAutoFill}
          pinyin={phrase.pinyin}
          english={phrase.english}
        />
      </div>
      <Col className={Style.colChinese}>
        <TextCell
          className={Style.cellChinese}
          value={phrase.characters}
          name="characters"
          onChange={updateField}
          placeholder="新的"
          onReturn={autofill}
        />
      </Col>
      <Col className={Style.colPinyin}>
        <TextCell
          className={Style.cellPinyin}
          value={phrase.pinyin}
          name="pinyin"
          onChange={updateField}
          placeholder="pinyin"
          onFocus={() => setDisableAutofillFromFocus(true)}
          onBlur={() => setDisableAutofillFromFocus(false)}
        />
      </Col>
      <Col className={Style.colEnglish}>
        <TextAreaCell
          className={Style.cellEnglish}
          value={phrase.english}
          name="english"
          onChange={updateField}
          placeholder="english definition"
          onFocus={() => setDisableAutofillFromFocus(true)}
          onBlur={() => setDisableAutofillFromFocus(false)}
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
