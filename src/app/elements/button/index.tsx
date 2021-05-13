

import React, { FC, useState } from 'react';
import classNames from 'classnames';

import { getIcon } from '../icon';

import Style from './style.module.css';

type ButtonProps = {
  hidden: boolean
  doubleClick: boolean
  icon: string
  disabled: boolean
  color: string
  className: string
  tab: boolean
  children: string
  onClick: any
}

export const Button: FC<ButtonProps> = ({
  hidden,
  icon,
  disabled,
  color,
  className,
  tab,
  children,
  doubleClick,
  onClick: propsOnClick
}) => {

  const [clickCount, setClickCount] = useState<number>(0)

  const onClick = (e: any) => {
    e.preventDefault();
    if (doubleClick && clickCount === 0) {
      setClickCount(1);
      return;
    }
    propsOnClick(e);
    setClickCount(0);
  }

  if (hidden) {
    // if it is hidden then don't render anything
    return null;
  }

  const buttonClassName = classNames({
    [Style.button]: true,
    [className]: true,
    [Style.disabled]: disabled,
    [Style[color]]: !!color,
    'green': !color
  });

  // render
  const Icon = getIcon(icon);
  return (
    <div
      className={buttonClassName}
      onClick={e => onClick(e)}
      tabIndex={tab ? 0 : -1}
    >
      {
        !!icon &&
        <div className={Style.buttonIconHolder}>
          <Icon className={Style.buttonIcon}></Icon>
        </div>
      }
      <div className={Style.label}>
        {clickCount === 0 ? children : 'Confirm'}
      </div>
    </div>
  );
}

