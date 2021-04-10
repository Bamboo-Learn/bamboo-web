import React from 'react';
import { getIcon } from '../icon';

import Style from './style.module.css';

export class FormRow extends React.Component {
  render() {
    const Icon = getIcon(this.props.icon);

    if (!this.props.children) {
      return (<span></span>);
    }

    return (
      <div className={`${Style.FormRow} ${this.props.isError ? Style.Error : ''}`}>
        <div className={Style.LabelHolder}>
          {this.props.icon && <Icon className={Style.Icon} />}
          {this.props.label && <div className={Style.Label}>{this.props.label}</div>}
        </div>
        <div className={Style.InputHolder}>
          {this.props.children}
        </div>
      </div>
    );
  }
};