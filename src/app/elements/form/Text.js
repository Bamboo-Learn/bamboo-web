

import React from 'react';
import { getIcon } from '../icon';
import { Button } from '../button/Button.js';


import Style from './style.module.css';

export class Text extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.onChange(e);
  }

  render() {
    const Icon = getIcon(this.props.icon);

    // render
    return (
      <div className={`${Style.FormRow} ${this.props.isError ? Style.Error : ''}`}>
        <div className={Style.LabelHolder}>
          {this.props.icon && <Icon className={Style.Icon} />}
          {this.props.label && <div className={Style.Label}>{this.props.label}</div>}
        </div>
        <div className={Style.InputHolder}>
          <input
            className={Style.Input}
            type={this.props.isPassword ? 'password' : 'text'}
            placeholder={this.props.placeholder}
            value={this.props.value || ''}
            onChange={this.onChange}
          />
        </div>
        <div className={Style.ButtonHolder}>
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
        </div>
      </div>
    );
  }
}

