import React from 'react';
import './SubHeader.css';
import { Icon } from '../icon';

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
    const { icon } = this.props;
    return (
      <div className={Style.SubHeaderItem}>
        <Icon icon={icon} />
        {this.props.children}
      </div>
    );
  }
}


export { SubHeader, SubHeaderItem };
