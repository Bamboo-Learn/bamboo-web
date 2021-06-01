
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

type ColOptionsProps = {
  edit?: () => void,
  cancel: () => void,
  save: () => void,
  remove?: () => void,
  isEdited: boolean
  isSaveable: boolean
  cycleStatus: () => void,
  progress: number
}

const OptionButtons: FC<ColOptionsProps> = ({ edit, cancel, save, remove, isEdited, isSaveable, cycleStatus, progress }) => {
  const statusPrompt: string = ((): string => {
    if (progress === 0) {
      return 'To Learn';
    } else if (progress === 1) {
      return 'Learned';
    }
    return 'Learning'
  })();
  if (isEdited) {
    return (
      <>
        {/* TODO: make this first button flex to the left */}
        {/* Or maybe the column should just be a button with plus and minus on either side, click in the middle to cycle*/}
        <Button size="sm" onClick={cycleStatus} icon="" color="green">{statusPrompt}</Button>
        { isSaveable && <Button size="sm" onClick={save} icon="Edit" color="blue" tab>{'Save'}</Button>}
        <Button size="sm" onClick={cancel} icon="X" color="grey" tab>{'Cancel'}</Button>
      </>

    )
  } else if (!remove || !edit) {
    return <></>
  }
  return (
    <>
      <Button size="sm" onClick={cycleStatus} icon="" color="green">{statusPrompt}</Button>
      <Button size="sm" onClick={edit} icon="Edit" color="blue" className={Style.buttonHideLarge}>{'Edit'}</Button>
      <Button size="sm" onClick={remove} icon="Garbage" color="red" doubleClick>{'Delete'}</Button>
    </>
  );
}

export const ColOptions: FC<ColOptionsProps> = ({ edit, cancel, save, remove, isEdited, isSaveable, cycleStatus, progress }) => {
  const className = classNames({
    [Style.colOptions]: true,
    [Style.forceVisible]: isEdited
  });
  return (
    <Col className={className}>
      <OptionButtons
        edit={edit}
        cancel={cancel}
        remove={remove}
        save={save}
        isEdited={isEdited}
        isSaveable={isSaveable}
        cycleStatus={cycleStatus}
        progress={progress}
      />
    </Col>
  )
}
