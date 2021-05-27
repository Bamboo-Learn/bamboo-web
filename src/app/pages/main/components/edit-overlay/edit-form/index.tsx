

import React, { FC } from 'react';

import { Form, FormRow, FormText, FormTextarea } from 'app/elements'; // FormTextarea FormSlider, Button
import { Phrase, } from 'app/helpers'; // isSet

import Style from './style.module.css';

type EditFormProps = {
  updateField: (e: any) => void,
  deletePhrase: () => void,
  autofill: () => void,
  phrase: Phrase
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
      <FormRow
        label={phrase.confidence === 10 ? 'Learned' : phrase.confidence === 0 ? 'To Learn' : 'Learning'}
      >
        {/* <FormSlider
          name="confidence"
          placeholder="english definition"
          value={phrase.confidence}
          onChange={updateField}
        /> */}
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

