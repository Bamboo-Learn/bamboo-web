import React from 'react';

import { FormRow } from './FormRow';

import Style from './style.module.css';

export const FormMessage = ({
  children
}) => (
  <FormRow>
    <span className={Style.FormMessage}>{children}</span>
  </FormRow>
);