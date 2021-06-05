import React, { FC } from "react";

import { InputSelect, InputSelectPropTypes } from 'app/elements';

import Style from "./style.module.scss";

export const FormSelect: FC<InputSelectPropTypes> = (props) => (
  <InputSelect {...props} className={Style.input} />
);
