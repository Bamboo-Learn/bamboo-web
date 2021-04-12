

import React from 'react';

// import { Button } from '../button/Button.js';

import { FormRow } from './FormRow';
import Style from './style.module.css';

export class FormText extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.onChange(e);
  }

  render() {
    const { icon, errors, value, placeholder, isPassword, linkText, linkOnClick } = this.props;

    // render
    return (
      <FormRow icon={icon} errors={errors} linkText={linkText} linkOnClick={linkOnClick}>
        <input
          className={Style.Input}
          type={isPassword ? 'password' : 'text'}
          placeholder={placeholder}
          value={value || ''}
          onChange={this.onChange}
        />
        {/* <div className={Style.ButtonHolder}>
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
        </div> */}
      </FormRow>
    );
  }
}

