import React, { FC } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'app/elements'; // SearchIcon
import { updateFilter, FilterStateType, ReducerStateType } from 'app/redux';

import Style from './style.module.scss';

type TableHeaderPropTypes = {
  filter: FilterStateType,
  updateFilter: (filter: FilterStateType) => void
}

const RawTableHeader: FC<TableHeaderPropTypes> = ({ filter, updateFilter }) => {

  const changeOrderBy = (orderBy: "created_at" | "characters" | "pinyin" | "english") => {
    let order = 1;
    if (filter.orderBy === orderBy) {
      // if double click
      if (filter.order) {
        // if order is ASC, unset
        orderBy = 'created_at';
      } else {
        // else change from DESC to ASC
        order = 1;
      }
    }
    updateFilter({ ...filter, ...{ orderBy, order } });
  }

  return (
    <Row className={`${Style.rowPhrase} ${Style.rowHeader}`}>
      {/* <Col className={Style.confidence}>
        onClick={() => changeOrderBy('confidence')} 
         icon
      </Col> */}
      <Col className={`${Style.colChinese} ${Style.colHeader}`} onClick={(e) => changeOrderBy('characters')}>
        <span>{'Chinese'}</span>
      </Col>
      {/* <Col className={Style.pack}>
        {'Pack'}
      </Col> */}
      <Col className={`${Style.colPinyin} ${Style.colHeader}`} onClick={(e) => changeOrderBy('pinyin')} >
        <span>{'Pinyin'}</span>
      </Col>
      <Col className={`${Style.colEnglish} ${Style.colHeader}`} onClick={(e) => changeOrderBy('english')}>
        <span>{'English'}</span>
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
  updateFilter: (filter: FilterStateType) => {
    dispatch(updateFilter({ filter }))
  }
});

const TableHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTableHeader);

export { TableHeader };
