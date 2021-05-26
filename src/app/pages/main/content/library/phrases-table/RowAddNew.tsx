
import React, { FC, useState } from 'react';

import { Row, Col, TextCell, TextAreaCell } from 'app/elements';
import { makeNewPhrase, Phrase, Mongodb, isSet } from 'app/helpers'

import { AutofillCover, ColProgressLarge, OptionButtons } from './shared';
import Style from './style.module.scss';

type RowAddNewProps = {
}

const newPhrase = makeNewPhrase()

export const RowAddNew: FC<RowAddNewProps> = () => {

  const [phrase, setPhrase] = useState<Phrase>(newPhrase);
  const [disableAutofillFromFocus, setDisableAutofillFromFocus] = useState(false);

  const canAutoFill = !disableAutofillFromFocus && phrase.canAutoFill();
  const isEdited = phrase.isEdited(newPhrase);
  const isSaveable = phrase.isSaveable(newPhrase);

  const updateField = (e: any) => {
    setPhrase(phrase.set(`${e.target.name}`, e.target.value));
  }

  const cancel = () => {
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
    <Row backgroundFill={phrase.progress} className={`${Style.rowAddNew} ${Style.rowPhrase}`}>
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
        <OptionButtons
          cancel={cancel}
          save={() => { }}
          isEdited={isEdited}
          isSaveable={isSaveable}
        />

      </Col>
      <ColProgressLarge progress={phrase.progress} updateField={updateField} />
    </Row>
  );
}
