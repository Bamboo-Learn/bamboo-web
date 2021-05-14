
import React from 'react';

import { Button } from 'app/elements';

import { Row, Col } from './table';
import Style from './style.module.scss';

export const RowLoadMore = () => {
  return (
    <Row className={Style.rowButton}>
      <Col className={Style.colButton}>
        <Button color="orange" className={Style.button}>{'Load More'}</Button>
      </Col>
    </Row>
  );
}
