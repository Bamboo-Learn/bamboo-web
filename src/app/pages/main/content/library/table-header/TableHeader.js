import React from 'react';

import { LevelsIcon, PreviousIcon, NextIcon } from 'app/elements'; // SearchIcon

import Style from '../style.module.css';

const ORDER_OPTIONS = [
  { name: 'Date Added', value: '' },
  { name: 'Chinese', value: 'characters' },
  { name: 'Confidence', value: 'confidence' },
  { name: 'Pinyin', value: 'pinyin' },
  { name: 'English', value: 'english' }
];

// function makeTotalItemPages({ perPage, totalItems }) {
//   const pageOptions = [];
//   for(let i = 0; i < totalItems / perPage; ++i) {
//     pageOptions.push({
//       name: `${i + 1}`,
//       value: i
//     });
//   }
//   return pageOptions;
// }

export function makeLoadHistoryString({ search, orderBy, reverse, page }) {
  return `${search}:${orderBy}:${reverse}:${page}`;
}

class TableHeader extends React.Component {
  constructor(props) {
    super(props);

    // TODO: determine these
    const totalItems = 30 * 10;

    this.loadHistory = []; // pageview history to avoid reload of same searches

    this.state = {
      totalItems, // TODO: determine this here
      mode: 'STUDY',
      perPage: 30,
      orderBy: '',
      reverse: false,
      page: 0,
      search: ''
    }

    this.checkLoadHistory = this.checkLoadHistory.bind(this);
    this.changeOrderBy = this.changeOrderBy.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.changePageDrop = this.changePageDrop.bind(this);
    this.changePageArrow = this.changePageArrow.bind(this);

    // This triggers the inital load
    this.checkLoadHistory();
  }

  // returns true when not in history
  checkLoadHistory() {
    const loadHistoryString = makeLoadHistoryString(this.state);
    const includes = this.loadHistory.includes(loadHistoryString);
    if (!includes) {
      // if it is not in load history then add it
      this.loadHistory.push(loadHistoryString);
      // update global filter and request reload
      // this.props.updateFilter(this.state, true);
      return
    }
    // update global filter with no reload
    // this.props.updateFilter(this.state, false);
  }

  changeOrderBy(orderBy) {
    let reverse = false;
    if (this.state.orderBy === orderBy) {
      if (this.state.reverse) {
        // TODO: this doesn't reset, need to actually hold onto date added
        orderBy = '';
      } else {
        reverse = true;
      }
    }
    this.setState({
      orderBy,
      reverse
    }, () => {
      this.checkLoadHistory();
    });
  }

  changeOrder(e) {
    e.preventDefault();
    this.setState({
      reverse: !this.state.reverse
    }, () => {
      this.checkLoadHistory();
    });
  }

  changePageDrop(e) {
    e.preventDefault();
    this.setState({
      page: e.target.value
    }, () => {
      this.checkLoadHistory();
    });
  }

  changePageArrow(dir) {
    const { page, perPage, totalItems } = this.state;
    if (page === 0 && dir === -1) {
      return;
    } else if (page === totalItems / perPage && dir === 1) {
      // TODO: while totalItems isn't accurate might have to remove the second check
      return;
    }
    this.setState({
      page: page + dir
    }, () => {
      this.checkLoadHistory();
    });
  }

  render() {
    return (
      <div className={Style.SubHeader}>

        {/* ColSpan */}
        <span className={Style.ColSpan}>
          <div
            className={Style.IconHolder}
            onClick={() => this.changeOrderBy('confidence')}
          >
            <LevelsIcon className={`${Style.Icon} ${Style.Confidence} ${this.state.orderBy === 'confidence' ? Style.Selected : ''}`}></LevelsIcon>
          </div>
          <div
            className={`Col ColChinese ${this.state.orderBy === 'characters' ? 'Selected' : ''}`}
            onClick={() => this.changeOrderBy('characters')}
          >
            {'Chinese'}
          </div>
          <div
            className={`Col ColPinyin ${this.state.orderBy === 'pinyin' ? 'Selected' : ''}`}
            onClick={() => this.changeOrderBy('pinyin')}
          >
            {'Pinyin'}
          </div>
          <div
            className={`Col ColEnglish ${this.state.orderBy === 'english' ? 'Selected' : ''}`}
            onClick={() => this.changeOrderBy('english')}
          >
            {'English'}
          </div>
        </span>

        {/* Pages */}
        <span className={Style.PagesSpan}>
          <div className={Style.Pages}>
            <div
              className={Style.PageCol}
              onClick={e => this.changePageArrow(-1)}
            >
              <PreviousIcon className={Style.Icon}></PreviousIcon>
            </div>
            <div className="PageCol PageNumHolder">
              <div
                className={Style.PageNum}
              >{this.state.page + 1}</div>
              {/* <select
                className={Style.PageNum}
                value={ this.state.page }
                onChange={ e => this.changePageDrop(e) }
                disabled={ true } // TODO: enable this and make it work
              >
                {
                  makeTotalItemPages({
                    totalItems: this.state.totalItems,
                    perPage: this.state.perPage
                  }).map((p, i) => (
                    <option key={i} value={ p.value }>{ p.name }</option>
                  ))
                }
              </select> */}
            </div>
            <div
              className={Style.PageCol}
              onClick={e => this.changePageArrow(1)}
            >
              <NextIcon className={Style.Icon}></NextIcon>
            </div>
          </div>
        </span>

        {/* Search */}
        {/* <span className={Style.SearchSpan}>
					<SearchIcon className={Style.Icon}></SearchIcon>
					<input className={Style.Search} placeholder="Search" />
				</span> */}

        {/* Order */}
        <span className={Style.OrderSpan}>
          <div
            className={Style.IconHolder}
            onClick={e => this.changeOrder(e)}
          >
            <LevelsIcon className={Style.Icon}></LevelsIcon>
          </div>
          <select
            className={Style.OrderBy}
            value={this.state.orderBy}
            onChange={e => {
              e.preventDefault();
              this.changeOrderBy(e.target.value);
            }}
          >
            {
              ORDER_OPTIONS.map((o, i) => (
                <option key={i} value={o.value}>{o.name}</option>
              ))
            }
          </select>
        </span>

      </div>
    );
  }
}


export { TableHeader };
