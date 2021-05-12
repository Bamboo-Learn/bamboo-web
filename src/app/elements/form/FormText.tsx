

import React, { FC } from 'react';

import { InputText, InputTextPropTypes } from 'app/elements';

import Style from './style.module.css';

export const FormText: FC<InputTextPropTypes> = (props) => {
  return (
    <InputText {...props} className={Style.Input} />
    /* <div className={Style.ButtonHolder}>
      {this.props.buttonCallback &&
        <Button
          icon={this.props.buttonIcon}
          onClick={this.props.buttonCallback}
          hidden={!this.props.buttonVisible}
          color="green"
          label={this.props.buttonLabel}
          tab={true}
        />
      }
    </div> */
  );
}

