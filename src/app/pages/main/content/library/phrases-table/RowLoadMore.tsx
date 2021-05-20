
import React, { FC } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col } from 'app/elements';
import { updateFilter, ReducerStateType, FilterStateType } from 'app/redux';

import Style from './style.module.scss';

type RowLoadMoreProps = {
  updateFilter: ({ filter }: { filter: FilterStateType }) => void,
  filter: FilterStateType
}

const RawRowLoadMore: FC<RowLoadMoreProps> = ({ updateFilter, filter }) => {

  const loadMore = (): void => {
    // TODO: have a check to stop displaying load more
    const newFilter = { ...filter, page: filter.page + 1 }
    updateFilter({ filter: newFilter });
  }

  const canLoadMore: boolean = true;
  if (!canLoadMore) {
    return null;
  }

  return (
    // TODO: when scroll reaches this row, load more
    // if we've reached the end, hide this element
    <Row className={Style.rowButton}>
      <Col className={Style.colButton}>
        <Button onClick={loadMore} color="orange" className={Style.button}>{'Load More'}</Button>
      </Col>
    </Row>
  );
}

const mapStateToProps = (state: ReducerStateType) => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  updateFilter: ({ filter }: { filter: FilterStateType }) => {
    dispatch(updateFilter({ filter }))
  }
});

export const RowLoadMore = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawRowLoadMore);
