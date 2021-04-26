import React from 'react';

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
    const { isOpen } = this.state;
    const { openable, children, confidence } = this.props;
    return (
      <div className={`${Style.Row} ${isOpen ? Style.Open : Style.Min}`}>
        {
          openable &&
          <Col className={Style.ColToggleOpen}>
            <div className={`${Style.Toggle} noselect`} onClick={(e) => this.toggleOpen(e)}>
              <div className={`${Style.Arrow} ${isOpen ? Style.Open : ''}`}></div>
            </div>
          </Col>
        }

        {children}

        <div
          className={Style.Background}
          style={{
            width: `${100 * confidence / 10}%`
          }}
        ></div>
      </div>
    );
  }
}

class Col extends React.Component {
  render() {
    const { children, className, style } = this.props;
    return (
      <div className={`${Style.Col} ${className}`} style={style}>
        {children}
      </div>
    );
  }
}

export { Row, Col };