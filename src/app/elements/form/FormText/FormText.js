

import React from 'react';

// import { Button } from '../button/Button.js';
import Style from '../style.module.css';

export class FormText extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.onChange(e);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onReturn(e);
    }
  }

  render() {
    const { value, placeholder, isPassword } = this.props;

    // render
    return (
      <input
        className={Style.Input}
        type={isPassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
      />
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
}

