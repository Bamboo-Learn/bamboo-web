

import React, { FC } from 'react';

import { InputText, InputTextPropTypes } from 'app/elements';

import Style from './style.module.scss';

export const FormText: FC<InputTextPropTypes> = (props) => {
  return (
    <InputText {...props} className={`${Style.input} ${props.className}`} />
  );
}

