import React from 'react';

import { FormRow } from './FormRow';

import Style from './style.module.scss';

export const FormMessage = ({
  children
}) => (
  <FormRow>
    <span className={Style.formMessage}>{children}</span>
  </FormRow>
);