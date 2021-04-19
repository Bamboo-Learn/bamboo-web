import React from 'react';
import { getIcon } from '../icon';

import Style from './style.module.css';

export class FormRow extends React.Component {
  render() {
    const { icon, errors, children, label, linkOnClick, linkText, message } = this.props;
    const Icon = getIcon(icon);

    if (!children) {
      return (<span></span>);
    }

    const isIcon = (!!icon) ? true : false;

    return (
      <div className={`
        ${Style.FormRow} 
        ${!!errors && errors.length > 0 ? Style.Error : ''} 
        ${isIcon ? Style.IconRow : ''}
      `}>
        {/* ICON or LABEL */}
        {
          (icon || label) && <div className={Style.LabelHolder}>
            {isIcon && <Icon className={Style.Icon} />}
            {!isIcon && <div className={Style.Label}>{label}</div>}
          </div>
        }
        {/* INPUT */}
        <div className={`${Style.InputHolder} ${!icon && !label ? Style.InputHolderFullWidth : ''}`}>
          {children}
        </div>
        <div className={Style.Detail}>

          <div className={Style.Message}>
            {
              !!message && <span>{message}</span>
            }
            {
              !message && !!errors && errors.map((error, i) => (
                <span key={i} className={Style.Error}>{error}</span>
              ))
            }
          </div>

          {
            linkOnClick && linkText && <div className={Style.Link}>
              <span onClick={linkOnClick}>
                {linkText}
              </span>
            </div>
          }

        </div>
      </div>
    );
  }
};