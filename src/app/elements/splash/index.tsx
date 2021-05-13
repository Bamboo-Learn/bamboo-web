import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';

import Style from './style.module.css';

type SplashProps = {
  isSplashOverlayOpen: boolean
}

export const Splash: FC<SplashProps> = ({ isSplashOverlayOpen }) => {

  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  }, [isSplashOverlayOpen]);

  const className = classNames({
    [Style.splashOverlay]: true,
    [Style.visible]: isOpen,
    [Style.hidden]: !isOpen
  })

  return (
    <div className={className} />
  );

}
