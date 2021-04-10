

import React from 'react';

import { getIcon } from '../icon';

import Style from './style.module.css';

export class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickCount: 0
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    console.log('onClick');
    if (this.props.doubleClick && this.state.clickCount === 0) {
      console.log('firstClick');
      this.setState({
        clickCount: 1
      });
      return;
    }
    this.props.onClick(e);
    this.setState({
      clickCount: 0
    });
  }

  render() {
    const Icon = getIcon(this.props.icon);

    if (this.props.hidden) {
      // if it is hidden then don't render anything
      return (
        <span></span>
      );
    }

    // render
    return (
      <div
        className={`${Style.Button}
					${this.props.className}
					${this.props.disabled ? Style.Disabled : ''}
					${!!this.props.color ? this.props.color : 'green'}`
        }
        onClick={e => this.onClick(e)}
        tabIndex={this.props.tab ? 0 : -1}
      >
        <div className={Style.ButtonIconHolder}>
          <Icon className={Style.ButtonIcon}></Icon>
        </div>
        <div className={Style.Label}>
          {this.state.clickCount === 0 ? this.props.label : Style.Confirm}
        </div>
      </div>
    );
  }
}

