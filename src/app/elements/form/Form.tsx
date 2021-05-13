

import React, { FC } from 'react';

import Style from './style.module.css';

type FormProps = {
  children: JSX.Element | JSX.Element[]
}

export const Form: FC<FormProps> = ({ children }) => {
  return (
    <div className={Style.Form}>
      {children}
    </div>
  );
}

