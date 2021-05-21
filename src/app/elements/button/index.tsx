

import React, { FC, useState } from 'react';
import classNames from 'classnames';

import { Icon } from 'app/elements';

import Style from './style.module.scss';

type ButtonProps = {
  children: string
  onClick: any
  hidden?: boolean
  doubleClick?: boolean
  icon?: string
  disabled?: boolean
  color?: string
  className?: string
  tab?: boolean
  size?: 'sm' | 'small' | 'form'
}

export const Button: FC<ButtonProps> = ({
  hidden,
  icon,
  disabled,
  color,
  className: classNameProp,
  tab,
  children,
  doubleClick,
  onClick: propsOnClick,
  size
}) => {

  const [clickCount, setClickCount] = useState<number>(0)

  const onClick = (e: any) => {
    e.preventDefault();
    if (doubleClick && clickCount === 0) {
      setClickCount(1);
      setTimeout(() => {
        setClickCount(0);
      }, 2000);
      return;
    }
    propsOnClick(e);
    setClickCount(0);
  }

  if (hidden) {
    // if it is hidden then don't render anything
    return null;
  }

  const classNameSize = !!size ? Style[size] : '';
  const classNamePropValidated = !!classNameProp ? classNameProp : '';
  const classNameColor = !!color ? Style[color] : '';
  const buttonClassName = classNames({
    [Style.button]: true,
    [classNamePropValidated]: true,
    [Style.disabled]: disabled,
    [classNameColor]: !!color,
    [classNameSize]: !!size
  });

  // render
  return (
    <div
      className={buttonClassName}
      onClick={e => onClick(e)}
      tabIndex={tab ? 0 : -1}
    >
      {
        !!icon &&
        <div className={Style.buttonIconHolder}>
          <Icon icon={icon} className={Style.buttonIcon}></Icon>
        </div>
      }
      <div className={Style.label}>
        {clickCount === 0 ? children : 'Confirm'}
      </div>
    </div>
  );
}

