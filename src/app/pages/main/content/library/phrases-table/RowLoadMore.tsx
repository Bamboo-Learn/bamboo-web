
import React from 'react';

import { Button, Row, Col } from 'app/elements';

import Style from './style.module.scss';

export const RowLoadMore = () => {
  return (
    <Row className={Style.rowButton}>
      <Col className={Style.colButton}>
        <Button onClick={() => { }} color="orange" className={Style.button}>{'Load More'}</Button>
      </Col>
    </Row>
  );
}
