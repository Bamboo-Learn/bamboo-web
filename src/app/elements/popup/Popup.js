import React from 'react';
import classNames from 'classnames';

import { getIcon } from '../icon';
import { Loading } from '../loading/Loading.js';

import Style from './style.module.css';

export class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.close = this.close.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.onSubmit(e);
  }

  close() {
    this.props.onClose();
  }

  render() {
    const overlayClassName = classNames({
      [Style.Overlay]: true,
      [Style.Visible]: this.props.isOpen,
      [Style.Hidden]: !this.props.isOpen
    });
    const CancelIcon = getIcon('Cancel');
    return (
      <div id={this.props.id} className={overlayClassName}>
        <div className={Style.Popup}>
          <Loading
            color="green"
            isLoading={this.props.isLoading}
          >
            <div className={Style.PopupHeader}>
              <div className={Style.Title}>
                {this.props.title}
              </div>
              {
                this.props.onClose &&
                <div className={Style.CancelIconHolder} onClick={this.close}>
                  <CancelIcon className={Style.CancelIcon} />
                </div>
              }
            </div>
            <form onSubmit={e => this.submit(e)}>
              <div className={Style.PopupBody}>
                {this.props.children}
              </div>
              <div className={Style.ActionHolder}>
                <button
                  type="submit"
                  className={Style.Action}
                  onClick={e => this.submit(e)}
                  tabIndex={0}
                >
                  {this.props.action}
                </button>
              </div>
            </form>
          </Loading>
        </div>
      </div>
    );
  }
}
