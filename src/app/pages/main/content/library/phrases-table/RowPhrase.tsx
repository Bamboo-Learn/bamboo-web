
import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import { Phrase, Mongodb, isSet } from 'app/helpers';
import { progressBackground, Row, Col, TextCell, TextAreaCell, Button, InputSlider } from 'app/elements';

import { AutofillCover } from './AutofillCover';
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

// ColLarge

type ColProgressLargeProps = {
  progress: number,
  updateField: (e: any) => void
}

const ColProgressLarge: FC<ColProgressLargeProps> = ({ progress, updateField }) => {
  return (
    <Col className={Style.colProgressLarge}>
      {/* TODO: in here have a cover that covers the whole row, that says status (learning, learned...) */}
      <InputSlider onChange={updateField} value={progress} name="progress" />
    </Col>
  );
}

// Options

type OptionButtonsProps = {
  edit: () => void,
  cancel: () => void,
  save: () => void,
  remove: () => void,
  isEdited: boolean
}

const OptionButtons: FC<OptionButtonsProps> = ({ edit, cancel, save, remove, isEdited }) => {
  if (isEdited) {
    return (
      <>
        <Button size="sm" onClick={cancel} icon="X" color="grey">{'Cancel'}</Button>
        <Button size="sm" onClick={save} icon="Edit" color="blue">{'Save'}</Button>
      </>

    )
  }
  return (
    <>
      <Button size="sm" onClick={remove} icon="Garbage" color="red" doubleClick>{'Delete'}</Button>
      <Button size="sm" onClick={edit} icon="Edit" color="blue" className={Style.buttonHideLarge}>{'Edit'}</Button>
    </>
  );
}

// RowPhrase

type RowPhraseProps = {
  phrase: Phrase,
  edit: () => void // this is for the edit button
}

export const RowPhrase: FC<RowPhraseProps> = ({ phrase: phraseProp, edit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phrase, setPhrase] = useState(phraseProp.copy());
  const [disableAutofillFromFocus, setDisableAutofillFromFocus] = useState(false);

  const isEdited = phrase.isEdited(phraseProp);
  const canAutoFill = !disableAutofillFromFocus && phrase.canAutoFill();

  useEffect(() => {
    // if the phrase updates, copy it into state
    setPhrase(phraseProp.copy());
  }, [phraseProp]);

  const updateField = (e: any) => {
    if (e.target.name === 'progress') {
      setPhrase(phrase.set('progress', parseFloat(e.target.value)));
      return;
    }
    setPhrase(phrase.set(e.target.name, e.target.value));
  }

  const toggleIsOpen = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
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

  const cancel = () => {
    setPhrase(phraseProp.copy());
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
        <TextCell
          className={Style.cellChinese}
          value={phrase.characters}
          name="characters"
          onChange={updateField}
          onReturn={autofill}
        />
      </Col>
      <ColProgressSmall progress={phrase.progress} />
      <Col className={Style.colPinyin}>
        <TextCell
          className={Style.cellPinyin}
          value={phrase.pinyin}
          name="pinyin"
          onChange={updateField}
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
          onFocus={() => setDisableAutofillFromFocus(true)}
          onBlur={() => setDisableAutofillFromFocus(false)}
        />
      </Col>

      <Col className={Style.colOptions}>
        <OptionButtons
          edit={edit}
          cancel={cancel}
          remove={() => { }}
          save={() => { }}
          isEdited={isEdited}
        />
      </Col>

      <ColProgressLarge progress={phrase.progress} updateField={updateField} />
    </Row>
  );
}


