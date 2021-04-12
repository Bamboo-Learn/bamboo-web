

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
    if (this.props.doubleClick && this.state.clickCount === 0) {
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
    const { hidden, icon, disabled, color, className, tab, children } = this.props;
    const { clickCount } = this.state;
    const Icon = getIcon(icon);

    if (hidden) {
      // if it is hidden then don't render anything
      return (
        <span></span>
      );
    }

    // render
    return (
      <div
        className={`${Style.Button}
					${className}
					${disabled ? Style.Disabled : ''}
					${!!color ? Style[color] : 'green'}`
        }
        onClick={e => this.onClick(e)}
        tabIndex={tab ? 0 : -1}
      >
        {
          !!icon &&
          <div className={Style.ButtonIconHolder}>
            <Icon className={Style.ButtonIcon}></Icon>
          </div>
        }
        <div className={Style.Label}>
          {clickCount === 0 ? children : Style.Confirm}
        </div>
      </div>
    );
  }
}

