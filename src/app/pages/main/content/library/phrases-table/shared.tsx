
import React, { FC } from 'react';
import classNames from 'classnames';

import { Col, InputSlider, Button } from 'app/elements'; // Icon

import Style from './style.module.scss';

// AutoFill

type AutofillCoverProps = {
  visible: boolean,
  pinyin: string,
  english: string,
  // autofill: () => void
}

export const AutofillCover: FC<AutofillCoverProps> = ({ visible, pinyin, english }) => {
  const className = classNames({
    // hidden when no chinese text or english / pinyin in focus
    [Style.hidden]: !visible || pinyin !== '' || english !== '',
    [Style.coverAutofill]: true,
    // [Style.colPinyin]: pinyin === '' && english !== '',
    // [Style.colEnglish]: pinyin !== '' && english === '',
  });
  return (
    <div className={className}>
      {/* <Icon icon="keyboard" /> */}
      {'Return to autofill, tab to enter manually'}
    </div>
  )
};

// Progress

type ColProgressLargeProps = {
  progress: number,
  updateField: (e: any) => void
}

export const ColProgressLarge: FC<ColProgressLargeProps> = ({ progress, updateField }) => {
  return (
    <Col className={Style.colProgressLarge}>
      {/* TODO: slider thumb (learning, learned...) */}
      <InputSlider onChange={updateField} value={progress} name="progress" />
    </Col>
  );
}

// Options

type OptionButtonsProps = {
  edit?: () => void,
  cancel: () => void,
  save: () => void,
  remove?: () => void,
  isEdited: boolean
  isSaveable: boolean
}

export const OptionButtons: FC<OptionButtonsProps> = ({ edit, cancel, save, remove, isEdited, isSaveable }) => {
  if (isEdited) {
    return (
      <>
        { isSaveable && <Button size="sm" onClick={save} icon="Edit" color="blue" tab>{'Save'}</Button>}
        <Button size="sm" onClick={cancel} icon="X" color="grey" tab>{'Cancel'}</Button>
      </>

    )
  } else if (!remove || !edit) {
    return <></>
  }
  return (
    <>
      <Button size="sm" onClick={edit} icon="Edit" color="blue" className={Style.buttonHideLarge}>{'Edit'}</Button>
      <Button size="sm" onClick={remove} icon="Garbage" color="red" doubleClick tab>{'Delete'}</Button>
    </>
  );
}
