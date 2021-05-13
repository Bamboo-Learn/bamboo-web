import React, { FC } from 'react';

import { confidenceBackground } from 'app/elements';

import { Col } from '../table';
import Style from './style.module.css';

export const ColOpenerSmall: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <Col display="sm" className={Style.colOpener}></Col>
  );
}

export const ColChineseSmall: FC<{ characters: string }> = ({ characters }) => {
  return (
    <Col display="sm" className={Style.chinese}>
      {characters}
    </Col>
  );
}

export const ColDefinitionSmall: FC<{ pinyin: string, english: string }> = ({ pinyin, english }) => {
  return (
    <Col display="sm" className={Style.definition}>
      <p>
        <span className={Style.Pinyin}>{pinyin}</span> &mdash; <span className={Style.English}>{english}</span>
      </p>
    </Col>
  );
}

export const ColConfidenceSmall: FC<{ confidence: number }> = ({ confidence }) => {
  return (
    <Col display="sm" className={Style.confidence}>
      <div
        className={`${Style.ConfidenceBar} noselect`}
        style={confidenceBackground(confidence)}
      >
      </div>
    </Col>
  );
}