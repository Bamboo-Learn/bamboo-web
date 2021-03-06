import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { InputText, InputSelect } from 'app/elements';
import { Icon } from 'app/elements';
import { updateFilter } from 'app/redux';

import Style from './style.module.scss';

const PROGRESS_OPTIONS = [
  { label: 'All Progress', value: '' },
  { label: 'To Learn', value: '? === 0' },
  { label: 'Learning', value: '? !==0 && ? !== 1' },
  { label: 'Learned', value: '? === 1' }
];

const ORDER_BY_OPTIONS = [
  { label: 'Date Added', value: 'created_at' },
  { label: 'Progress', value: 'progress' },
  { label: 'Chinese', value: 'characters' },
  { label: 'Pinyin', value: 'pinyin' },
  { label: 'English', value: 'english' }
];

const PACK_OPTIONS = [
  { label: 'All Packs', value: '' }
];

const FilterRow = ({
  children,
  icon,
  iconAction,
  iconClassName,
  className
}) => {
  const inputHolderClassName = classNames({
    [Style.inputHolder]: true,
    [Style.iconInputHolder]: !!icon,
  });
  return (
    <div className={`${Style.filterRow} ${className}`}>
      <div className={inputHolderClassName}>
        {children}
      </div>
      {
        !!icon && <div onClick={e => iconAction(e)} className={Style.iconHolder}>
          <Icon icon={icon} className={`${Style.icon} ${iconClassName}`} />
        </div>
      }
    </div>
  );
};

const getFilterClassName = ({ isOpen }) => {
  return classNames({
    [Style.filter]: true,
    [Style.open]: isOpen,
    [Style.closed]: !isOpen
  });
};

class RawFilter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      searchQuery: ''
    }
  }

  toggleOpen = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateSearch = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
  }

  sendSearch = () => {
    const { updateFilter, filter } = this.props;
    const { searchQuery } = this.state;
    const newFilter = { ...filter, ...{ search: searchQuery } };
    updateFilter({ filter: newFilter });
  }

  toggleOrder = (e) => {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ order: -1 * filter.order } };
    updateFilter({ filter: newFilter });
  }

  updateOrderBy = (e) => {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ orderBy: e.target.value } };
    updateFilter({ filter: newFilter });
  }

  updatePack = (e) => {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ pack: e.target.value } };
    updateFilter({ filter: newFilter });
  }

  updateProgress = (e) => {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ progress: e.target.value } };
    updateFilter({ filter: newFilter });
  }

  renderStudyMode() {
    const { isOpen } = this.state;
    const { filter: { pack, progress } } = this.props;
    return (
      <div className={getFilterClassName({ isOpen })}>
        <FilterRow
          icon="Filter"
          iconAction={e => this.toggleOpen(e)}
        >
          <InputSelect
            onChange={(e) => this.updatePack(e)}
            value={pack}
            options={PACK_OPTIONS}
          />
        </FilterRow>
        <FilterRow>
          {/* progress select (study, to study, studied, all) */}
          <InputSelect
            onChange={(e) => this.updateProgress(e)}
            value={progress}
            options={PROGRESS_OPTIONS}
          />
        </FilterRow>
      </div>
    );
  }

  renderTableMode() {
    const { isOpen, searchQuery } = this.state;
    const { filter: { orderBy, order, progress } } = this.props; // pack
    return (
      <div className={getFilterClassName({ isOpen })}>
        <FilterRow
          icon="Filter"
          iconAction={e => this.toggleOpen(e)}
        >
          {/* search */}
          {/* toggle button to reveal the rest of the filter (mobile) */}
          <InputText
            onReturn={e => this.sendSearch(e)}
            onChange={e => this.updateSearch(e)}
            value={searchQuery}
            placeholder="Search"
          />
        </FilterRow>
        <FilterRow
          className={Style.hiddenLg}
          icon={order === 1 ? 'down' : 'up'}
          iconAction={e => this.toggleOrder(e)}
        >
          {/* order by (mobile) multi select and order toggle */}
          <InputSelect
            onChange={(e) => this.updateOrderBy(e)}
            value={orderBy}
            options={ORDER_BY_OPTIONS}
          />
        </FilterRow>
        {/* TODO: pack multi select */}
        {/* <FilterRow>
          <InputSelect
            onChange={(e) => this.updatePack(e)}
            value={pack}
            options={PACK_OPTIONS}
          />
        </FilterRow> */}
        <FilterRow>
          {/* progress select (study, to study, studied, all) */}
          <InputSelect
            onChange={(e) => this.updateProgress(e)}
            value={progress}
            options={PROGRESS_OPTIONS}
          />
        </FilterRow>
      </div>
    );
  }

  render() {
    const { mode } = this.props;
    if (mode === 'study') {
      return this.renderStudyMode();
    }
    return this.renderTableMode();
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => ({
  updateFilter: ({ filter }) => {
    dispatch(updateFilter({ filter }))
  }
});

const Filter = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawFilter);

export { Filter };