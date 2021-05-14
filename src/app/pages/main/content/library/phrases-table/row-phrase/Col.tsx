import React, { FC } from 'react';

import { Col, TextCell } from '../table';
import Style from '../style.module.scss';

export const ColChinese: FC<{ characters: string }> = ({ characters }) => {
  return (
    <Col className={Style.chinese}>
      <TextCell value={characters} />
    </Col>
  );
}

export const ColPinyin: FC<{ pinyin: string }> = ({ pinyin }) => {
  return (
    <Col className={Style.pinyin}>
      <TextCell value={pinyin} />
    </Col>
  );
}

export const ColEnglish: FC<{ english: string }> = ({ english }) => {
  return (
    <Col className={Style.english}>
      <TextCell value={english} />
    </Col>
  );
}

export const ColOptions: FC = () => {
  return (
    <Col className={Style.options}>
    </Col>
  );
}

