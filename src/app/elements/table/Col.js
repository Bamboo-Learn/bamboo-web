
import React from 'react';

import Style from './style.module.css';

class Col extends React.Component {
  render() {
    return (
      <div className={`${Style.Col} ${this.props.className}`} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export { Col };
