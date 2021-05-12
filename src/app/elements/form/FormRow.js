import React from 'react';
import { getIcon } from '../icon';

import Style from './style.module.css';

const IconLabelSwitch = ({ icon, label, isIcon, }) => {
  const Icon = getIcon(icon);
  return (
    <>
      {
        (icon || label) && <div className={Style.LabelHolder}>
          {isIcon && <Icon className={Style.Icon} />}
          {!isIcon && <div className={Style.Label}>{label}</div>}
        </div>
      }
    </>
  )
}

const Input = ({ icon, label, children }) => {
  return (
    <div className={`${Style.InputHolder} ${!icon && !label ? Style.InputHolderFullWidth : ''}`}>
      {children}
    </div>
  )
};

const Detail = ({ message, errors, linkOnClick, linkText }) => {
  return (
    <div className={Style.Detail}>
      {/* Messages and errors */}
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
      {/* Link */}
      {
        linkOnClick && linkText && <div className={Style.Link}>
          <span onClick={linkOnClick}>
            {linkText}
          </span>
        </div>
      }
    </div>
  )
}

export class FormRow extends React.Component {
  render() {
    const { icon, errors, children, label, linkOnClick, linkText, message } = this.props;

    if (!children) {
      return (<></>);
    }

    const isIcon = (!!icon) ? true : false;

    return (
      <div className={`
        ${Style.FormRow} 
        ${!!errors && errors.length > 0 ? Style.Error : ''} 
        ${isIcon ? Style.IconRow : ''}
      `}>
        <IconLabelSwitch isIcon={isIcon} label={label} icon={icon} />
        <Input icon={icon} label={label}>{children}</Input>
        <Detail message={message} errors={errors} linkOnClick={linkOnClick} linkText={linkText} />
      </div>
    );
  }
};