import React from 'react';

import { Col } from './Col.js';

import Style from './style.module.css';

class Row extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggleOpen(e) {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className={`${Style.Row} ${this.state.isOpen ? Style.Open : Style.Min}`}>
        {
          this.props.openable &&
          <Col className={Style.ColToggleOpen}>
            <div className={`${Style.Toggle} noselect`} onClick={(e) => this.toggleOpen(e)}>
              <div className={`${Style.Arrow} ${this.state.isOpen ? Style.Open : ''}`}></div>
            </div>
          </Col>
        }

        {this.props.children}

        <div
          className={Style.Background}
          style={{
            width: `${100 * this.props.confidence / 10}%`
          }}
        ></div>
      </div >
    );
  }
}

export { Row };