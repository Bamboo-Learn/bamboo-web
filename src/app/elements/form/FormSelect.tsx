import React, { FC } from "react";

import { Select, SelectPropTypes } from 'app/elements';

import Style from "./style.module.css";

export const FormSelect: FC<SelectPropTypes> = (props) => (
  <Select {...props} className={Style.Input} />
);
