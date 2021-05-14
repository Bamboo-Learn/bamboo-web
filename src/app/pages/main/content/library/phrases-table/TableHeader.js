import React from 'react';
import { connect } from 'react-redux';

// import { LevelsIcon } from 'app/elements'; // SearchIcon
import { updateFilter } from 'app/redux';

import { Row, Col } from './table';
import Style from './style.module.scss';

const RawTableHeader = ({ filter, updateFilter }) => {

  const changeOrderBy = (orderBy) => {
    let reverse = false;
    if (filter.orderBy === orderBy) {
      if (filter.reverse) {
        // TODO: this doesn't reset, need to actually hold onto date added
        orderBy = '';
      } else {
        reverse = true;
      }
    }
    const newFilter = { ...filter, ...{ orderBy, reverse } };
    updateFilter({ filter: newFilter });
  }

  return (
    <Row className={Style.headerRow}>
      <Col className={Style.confidence} onClick={() => changeOrderBy('confidence')}>
        {/* icon */}
      </Col>
      <Col className={Style.chinese} onClick={() => changeOrderBy('characters')}>
        {'Chinese'}
      </Col>
      <Col className={Style.pack} onClick={() => changeOrderBy('pack')}>
        {'Pack'}
      </Col>
      <Col className={Style.pinyin} onClick={() => changeOrderBy('pinyin')}>
        {'Pinyin'}
      </Col>
      <Col className={Style.english} onClick={() => changeOrderBy('english')}>
        {'English'}
      </Col>
    </Row>
  );
}


const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => ({
  updateFilter: ({ filter, mongodb }) => {
    dispatch(updateFilter({ filter, mongodb }))
  }
});

const TableHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTableHeader);

export { TableHeader };
