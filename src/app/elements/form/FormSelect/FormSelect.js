

import React from 'react';
import { getIcon } from 'app/elements/icon';

import Style from './style.module.css';

export class Select extends React.Component {
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
      // TODO: remove FormRow here
      <div className={`${Style.FormRow} ${this.props.isError ? Style.Error : ''}`}>
        <div className={Style.LabelHolder}>
          {this.props.icon && <Icon className={Style.Icon} />}
          {this.props.label && <div className={Style.Label}>{this.props.label}</div>}
        </div>
        <div className={Style.InputHolder}>
          <select
            className={Style.Input}
            placeholder={this.props.placeholder}
            value={this.props.value || ''}
            onChange={this.onChange}
          >
            {this.props.options.forEach(option => <option value={option.value}>{option.label}</option>)}
          </select>
        </div>
      </div>
    );
  }
}

