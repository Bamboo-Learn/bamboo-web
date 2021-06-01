

import React, { FC } from 'react';

import { Form, FormRow, FormText, FormTextarea, FormSlider } from 'app/elements'; // FormTextarea FormSlider, Button
import { DBPhrase, Phrase, } from 'app/classes'; // isSet

import Style from './style.module.css';

type EditFormProps = {
  updateField: (e: any) => void,
  deletePhrase: () => void,
  autofill: () => void,
  phrase: Phrase | DBPhrase
}

export const EditForm: FC<EditFormProps> = ({ updateField, deletePhrase, autofill, phrase }) => {

  // const shouldHideAutofill = (() => {
  //   if (!isSet(phrase?.characters)) {
  //     return true;
  //   }
  //   if (isSet(phrase?.pinyin) && isSet(phrase?.english)) {
  //     return true;
  //   }
  //   return false;
  // })();

  // const shouldShowDelete = (() => {
  //   return isSet(phrase?._id);
  // })();

  const status = phrase.progress === 1 ? 'Learned' : phrase.progress === 0 ? 'To Learn' : 'Learning'

  return (
    <Form>
      {/* Chinese */}
      <FormRow
        label="Chinese"
        buttonIcon="Autofill"
        buttonLabel="Autofill"
        buttonVisible={true} // !shouldHideAutofill
        buttonOnClick={autofill}
        hideDetail
      >
        <FormText
          className={Style.inputChinese}
          name="characters"
          placeholder="中文"
          value={phrase.characters}
          onChange={updateField}
          onReturn={autofill}
        />
      </FormRow>


      {/* Pinyin */}
      <FormRow
        label="Pinyin"
        hideDetail
      >
        <FormText
          name="pinyin"
          placeholder="pinyin"
          value={phrase.pinyin}
          onChange={updateField}
        />
      </FormRow>

      {/* English */}
      <FormRow
        label="English"
        hideDetail
      >
        <FormTextarea
          name="english"
          placeholder="english definition"
          value={phrase.english}
          onChange={updateField}
        />
      </FormRow>

      {/* Pack TODO: use Select, or if select doesn't work maybe make a new one called Suggest */}
      <FormRow
        label="Pack"
      >
        {/* <FormSelect
          name="pack"
          value={phrase.pack}
          onChange={updateField}
        /> */}
      </FormRow>

      {/* Confidence / Status */}
      {/* TODO: maybe make a link at the bottom say status */}
      <FormRow
        label={`Progress: ${status}`}
      >
        <FormSlider
          name="progress"
          value={phrase.progress || 0}
          onChange={updateField}
        />
      </FormRow>

      {/* Delete Button */}
      {/* {
        shouldShowDelete &&
        <div className={Style.ButtonHolder}>
          <Button
            icon="Garbage"
            onClick={deletePhrase}
            hidden={!shouldShowDelete}
            label="Delete"
            doubleClick={true}
            tab={false}
            color="red"
          />
        </div>
      } */}
    </Form>
  );
}

