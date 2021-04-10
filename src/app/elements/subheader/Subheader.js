import React from 'react';
import './SubHeader.css';
import { getIcon } from '../icon';

class SubHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={Style.SubHeader}>
        {this.props.children}
      </div>
    );
  }
}

class SubHeaderItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Icon = getIcon(this.props.icon);
    return (
      <div className={Style.SubHeaderItem}>
        <Icon />
        {this.props.children}
      </div>
    );
  }
}


export { SubHeader, SubHeaderItem };
