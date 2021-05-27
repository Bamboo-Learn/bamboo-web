import React from 'react';

import { Canvas, Logo, Splash } from 'app/elements';

import Style from './style.module.css';

const ContainerRight = ({ children }) => {
  return (
    <div className={Style.containerRight}>
      {children}
    </div>
  );
}

const ContainerLeft = ({ children }) => {
  return (
    <div className={Style.containerLeft}>
      <div className={Style.logoHolder}>
        <Logo className={Style.logo} color="green" />
      </div>
      <div className={Style.containerLeftBody}>
        {children}
      </div>
    </div>
  );
}

const Container = ({ children, isSplashOverlayOpen }) => {
  return (
    <>
      <Splash isSplashOverlayOpen={isSplashOverlayOpen} />
      <div className={Style.container}>
        {children}
        <Canvas className={Style.canvas} />
      </div>
    </>
  );
}

export {
  Container,
  ContainerLeft,
  ContainerRight
};