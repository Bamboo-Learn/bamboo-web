import React from 'react';

import { InputText, Select } from 'app/elements';
import { getIcon } from 'app/elements';

import Style from './style.module.css';

const PROGRESS_OPTIONS = [
  { label: 'All Progress', value: '' },
  { label: 'To Learn', value: 'to_learn' },
  { label: 'Learning', value: 'learning' },
  { label: 'Learned', value: 'learned' }
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
  iconClassName
}) => {
  const Icon = getIcon(icon)
  return (
    <div className={Style.filterRow}>
      <div className={`${Style.inputHolder} ${!!icon ? Style.iconInputHolder : ''}`}>
        {children}
      </div>
      {
        !!icon && <div onClick={e => iconAction(e)} className={Style.iconHolder}>
          <Icon className={`${Style.icon} ${iconClassName}`} />
        </div>
      }
    </div>
  );
}

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      searchQuery: ''
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.sendSearch = this.sendSearch.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.updateOrderBy = this.updateOrderBy.bind(this);
    this.updatePack = this.updatePack.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
  }

  toggleOpen(e) {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  updateSearch(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }

  sendSearch() {
    const { updateFilter, filter } = this.props;
    const { searchQuery } = this.state;
    const newFilter = { ...filter, ...{ search: searchQuery } };
    updateFilter({ filter: newFilter });
  }

  toggleOrder(e) {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ order: -1 * filter.order } };
    updateFilter({ filter: newFilter });
  }

  updateOrderBy(e) {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ orderBy: e.target.value } };
    updateFilter({ filter: newFilter });
  }

  updatePack(e) {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ pack: e.target.value } };
    updateFilter({ filter: newFilter });
  }

  updateProgress(e) {
    e.preventDefault();
    const { filter, updateFilter } = this.props;
    const newFilter = { ...filter, ...{ progress: e.target.value } };
    updateFilter({ filter: newFilter });
  }

  render() {
    const { isOpen, searchQuery } = this.state;
    const { filter: { pack, orderBy, order, progress } } = this.props;
    return (
      <div className={`${Style.filter} ${isOpen ? Style.open : Style.closed}`}>
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
          icon={order === 1 ? 'Next' : 'Previous'}
          iconAction={e => this.toggleOrder(e)}
          iconClassName={Style.iconRotated}
        >
          {/* order by (mobile) multi select and order toggle */}
          <Select
            onChange={(e) => this.updateOrderBy(e)}
            value={orderBy}
            options={ORDER_BY_OPTIONS}
          />
        </FilterRow>
        <FilterRow>
          {/* pack multi select */}
          <Select
            onChange={(e) => this.updatePack(e)}
            value={pack}
            options={PACK_OPTIONS}
          />
        </FilterRow>
        <FilterRow>
          {/* progress select (study, to study, studied, all) */}
          <Select
            onChange={(e) => this.updateProgress(e)}
            value={progress}
            options={PROGRESS_OPTIONS}
          />
        </FilterRow>
      </div>
    );
  }
}

export { Filter };