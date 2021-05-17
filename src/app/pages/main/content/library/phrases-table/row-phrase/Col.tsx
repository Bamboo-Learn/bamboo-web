import React, { FC } from 'react';

import { Col, TextCell, TextAreaCell } from '../table';
import Style from '../style.module.scss';

export const ColChinese: FC<{ characters: string }> = ({ characters }) => {
  return (
    <Col className={Style.colChinese}>
      <TextCell className={Style.cellChinese} value={characters} />
    </Col>
  );
}

export const ColPinyin: FC<{ pinyin: string }> = ({ pinyin }) => {
  return (
    <Col className={Style.colPinyin}>
      <TextCell className={Style.cellPinyin} value={pinyin} />
    </Col>
  );
}

export const ColEnglish: FC<{ english: string }> = ({ english }) => {
  return (
    <Col className={Style.colEnglish}>
      <TextAreaCell className={Style.cellEnglish} value={english} />
    </Col>
  );
}

export const ColOptions: FC = () => {
  return (
    <Col className={Style.colOptions}>
    </Col>
  );
}

