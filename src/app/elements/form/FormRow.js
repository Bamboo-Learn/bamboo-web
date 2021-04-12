import React from 'react';
import { getIcon } from '../icon';

import Style from './style.module.css';

export class FormRow extends React.Component {
  render() {
    const { icon, errors, children, label, linkOnClick, linkText } = this.props;
    const Icon = getIcon(icon);

    if (!children) {
      return (<span></span>);
    }

    return (
      <div className={`${Style.FormRow} ${!!errors && errors.length > 0 ? Style.Error : ''}`}>
        {
          (icon || label) && <div className={Style.LabelHolder}>
            {icon && <Icon className={Style.Icon} />}
            {label && <div className={Style.Label}>{label}</div>}
          </div>
        }
        <div className={`${Style.InputHolder} ${!icon && !label ? Style.InputHolderFullWidth : ''}`}>
          {children}
        </div>
        {
          linkOnClick && linkText && <div className={Style.AdditionalHolder}>
            <span onClick={linkOnClick} className={Style.AdditionalLink}>
              {linkText}
            </span>
          </div>
        }
        <div className={Style.ErrorHolder}>
          {
            !!errors && errors.map((error, i) => (
              <span key={i}>{error}</span>
            ))
          }
        </div>
      </div>
    );
  }
};