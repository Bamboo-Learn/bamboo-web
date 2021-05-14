
import React from 'react';

import { Button } from 'app/elements';

import { Row, Col } from './table';
import Style from './style.module.scss';

export const RowAddNew = () => {
  return (
    <Row className={Style.rowButton}>
      <Col className={Style.colButton}>
        <Button className={Style.button}>{'Add New'}</Button>
      </Col>
    </Row>
  );
}
