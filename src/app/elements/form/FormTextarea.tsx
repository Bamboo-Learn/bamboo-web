
import React, { FC } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { InputTextPropTypes } from 'app/elements';

import Style from './style.module.scss';

export const FormTextarea: FC<InputTextPropTypes> = (props) => {
  return (
    <TextareaAutosize
      {...props} className={`${Style.input} ${props.className}`}
    />
  );
}

