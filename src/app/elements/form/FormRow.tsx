import React, { FC } from 'react';
import classNames from 'classnames'

import { getIcon } from '../icon';

import Style from './style.module.css';

const hasIcon = (icon: string | undefined) => !!icon;

type IconLabelSwitchProps = {
  icon?: string
  label?: string
}

const IconLabelSwitch: FC<IconLabelSwitchProps> = ({ icon, label }) => {
  const Icon = getIcon(icon);
  return (
    <>
      {
        (icon || label) && <div className={Style.LabelHolder}>
          {
            hasIcon(icon) ?
              <Icon className={Style.Icon} /> :
              <div className={Style.Label}>{label}</div>
          }
        </div>
      }
    </>
  )
}

type InputProps = IconLabelSwitchProps & {
  children: JSX.Element | JSX.Element[]
}

const Input: FC<InputProps> = ({ icon, label, children }) => {
  const className = classNames({
    [Style.InputHolder]: true,
    [Style.InputHolderFullWidth]: !icon && !label
  });
  return (
    <div className={className}> {children} </div>
  )
};

type DetailProps = {
  linkText?: string
  message?: string
  linkOnClick?: any
  errors?: string[]
}

const Detail: FC<DetailProps> = ({ message, errors, linkOnClick, linkText }) => {
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

type FormRowProps = DetailProps & InputProps;

export const FormRow: FC<FormRowProps> = ({ icon, errors, children, label, linkOnClick, linkText, message }) => {

  if (!children) {
    return (<></>);
  }


  const formRowClassName = classNames({
    [Style.FormRow]: true,
    [Style.Error]: !!errors && errors.length > 0,
    [Style.IconRow]: hasIcon(icon)
  });

  return (
    <div className={formRowClassName}>
      <IconLabelSwitch label={label} icon={icon} />
      <Input icon={icon} label={label}>{children}</Input>
      <Detail message={message} errors={errors} linkOnClick={linkOnClick} linkText={linkText} />
    </div>
  );
};