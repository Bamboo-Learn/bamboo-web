import React, { FC } from "react";

import { InputSuggest, InputSuggestPropTypes } from 'app/elements';

import Style from "./style.module.scss";

export const FormSuggest: FC<InputSuggestPropTypes> = (props) => (
  <InputSuggest {...props} className={Style.input} />
);
