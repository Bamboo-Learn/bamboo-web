import React, { FC } from 'react';
import classNames from 'classnames';

import { confidenceBackground, Col } from 'app/elements';

import Style from '../style.module.scss';

export const ColOpenerSmall: FC<{ isOpen: boolean, onClick: any }> = ({ isOpen, onClick }) => {
  const className = classNames({
    [Style.arrow]: true,
    [Style.open]: isOpen
  })
  return (
    <Col className={Style.colToggleOpen}>
      <div className={`${Style.toggle} noselect`} onClick={onClick}>
        <div className={className}></div>
      </div>
    </Col>
  );
}

export const ColConfidenceSmall: FC<{ confidence: number }> = ({ confidence }) => {
  return (
    <Col className={Style.colConfidence}>
      <div
        className={`${Style.confidenceBar} noselect`}
        style={confidenceBackground(confidence)}
      >
      </div>
    </Col>
  );
}
