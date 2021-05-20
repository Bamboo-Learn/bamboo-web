import React, { FC } from "react";

import { Select, SelectPropTypes } from 'app/elements';

import Style from "./style.module.scss";

export const FormSelect: FC<SelectPropTypes> = (props) => (
  <Select {...props} className={Style.input} />
);
