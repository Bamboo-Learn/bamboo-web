

import React from 'react';
import classNames from 'classnames';

import Style from './style.module.scss';


export class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 4,
      animatable: true
    }

  }

  componentDidUpdate(prevProps) {
    // if the props are not the same as before
    if (!prevProps.isLoading && this.props.isLoading) {
      // start loading
      this.startLoad();
    } else if (prevProps.isLoading && !this.props.isLoading) {
      // finish loading
      this.finishLoad();
    }
  }

  startLoad() {
    this.setState({
      width: Math.random() * .25 + .5,
      height: 4,
      animatable: true
    })
  }

  finishLoad() {
    // finish loading | W: x% -> 100%
    this.setState({
      width: 1,
      height: 4,
      animatable: true
    });
    // then close the bar | H: 4 -> 0
    setTimeout(() => {
      this.setState({
        width: 1,
        height: 0,
        animatable: true
      });
    }, 200);
    // then reset the bar | W: 100% -> 0%
    setTimeout(() => {
      this.setState({
        width: 0,
        height: 0,
        animatable: false
      });
    }, 400);
    // then ready it for the next load
    setTimeout(() => {
      this.setState({
        width: 0,
        height: 4,
        animatable: true
      });
    }, 600);
  }

  render() {
    const style = {
      ...this.props.style,
      width: `${this.state.width * 100}%`,
      height: `${this.state.height}px`
    };
    const loadingBarClassName = classNames({
      [Style.loadingBar]: true,
      [Style.noAnimation]: !this.state.animatable,
      [this.props.color]: !!this.props.color
    })
    const loadingFormClassName = classNames({
      [Style.loadingForm]: true,
      [Style.disabled]: this.props.isLoading && this.props.disableWhileLoading
    })
    return (
      <span>
        <div className={Style.loadingBarHolder}>
          <div className={loadingBarClassName} style={style} />
        </div>
        <div className={loadingFormClassName}>
          {this.props.children}
        </div>
      </span>
    );
  }
}

