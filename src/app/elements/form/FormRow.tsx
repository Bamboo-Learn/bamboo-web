import React, { FC } from 'react';
import classNames from 'classnames'

import { Button, Icon } from 'app/elements';

import Style from './style.module.scss';


type IconLabelSwitchProps = {
  icon?: string
  label?: string
}

const FormIconLabelSwitch: FC<IconLabelSwitchProps> = ({ icon, label }) => {
  return (
    <>
      {
        (icon || label) && <div className={Style.labelHolder}>
          {
            !!icon ?
              <Icon icon={icon} className={Style.icon} /> :
              <div className={Style.label}>{label}</div>
          }
        </div>
      }
    </>
  )
}

type FormInputProps = IconLabelSwitchProps & {
  children: JSX.Element | JSX.Element[]
}

const FormInput: FC<FormInputProps> = ({ icon, label, children }) => {
  const className = classNames({
    [Style.inputHolder]: true,
    [Style.inputHolderFullWidth]: !icon && !label
  });
  return (
    <div className={className}> {children} </div>
  )
};

type FormDetailProps = {
  linkText?: string
  message?: string
  linkOnClick?: any
  errors?: string[]
}

const FormDetail: FC<FormDetailProps> = ({ message, errors, linkOnClick, linkText }) => {
  return (
    <div className={Style.detail}>
      {/* Messages and errors */}
      <div className={Style.message}>
        {
          !!message && <span>{message}</span>
        }
        {
          !message && !!errors && errors.map((error, i) => (
            <span key={i} className={Style.error}>{error}</span>
          ))
        }
      </div>
      {/* Link */}
      {
        linkOnClick && linkText && <div className={Style.link}>
          <span onClick={linkOnClick}>
            {linkText}
          </span>
        </div>
      }
    </div>
  )
}

type FormButtonProps = {
  buttonOnClick?: () => void,
  buttonIcon?: string,
  buttonLabel?: string,
  buttonVisible?: boolean
}

const FormButton: FC<FormButtonProps> = ({ buttonOnClick, buttonVisible, buttonIcon, buttonLabel }) => {
  return (
    <Button
      icon={buttonIcon}
      onClick={buttonOnClick}
      hidden={!buttonVisible}
      color="green"
      tab={true}
    >
      {buttonLabel || ''}
    </Button>
  )
}



type FormRowProps = FormDetailProps & FormInputProps & FormButtonProps;

export const FormRow: FC<FormRowProps> = ({ icon, errors, children, label, linkOnClick, linkText, message, buttonOnClick, buttonIcon, buttonLabel, buttonVisible }) => {

  if (!children) {
    return (<></>);
  }

  const formRowClassName = classNames({
    [Style.formRow]: true,
    [Style.error]: !!errors && errors.length > 0,
    [Style.iconRow]: !!icon
  });

  return (
    <div className={formRowClassName}>
      <FormIconLabelSwitch label={label} icon={icon} />
      {!!buttonOnClick && <FormButton
        buttonOnClick={buttonOnClick}
        buttonVisible={buttonVisible}
        buttonLabel={buttonLabel}
        buttonIcon={buttonIcon}
      />}
      <FormInput icon={icon} label={label}>{children}</FormInput>
      <FormDetail message={message} errors={errors} linkOnClick={linkOnClick} linkText={linkText} />
    </div>
  );
};