import React, { FC } from 'react';
import classNames from 'classnames';

import { Icon } from 'app/elements';
import { Loading } from '../loading/Loading.js';

import Style from './style.module.scss';

type PopupProps = {
  onSubmit: (e: any) => void,
  onClose?: (e: any) => void,
  isOpen: boolean,
  id?: string,
  isLoading: boolean,
  title: string,
  children: JSX.Element | JSX.Element[],
  action: string
}

export const Popup: FC<PopupProps> = ({
  onSubmit,
  onClose,
  isOpen,
  id,
  isLoading,
  title,
  children,
  action
}) => {

  const submit = (e: any) => {
    e.preventDefault();
    onSubmit(e);
  }

  const close = (e: any) => {
    if (!!onClose) {
      onClose(e);
    }
  }


  const overlayClassName = classNames({
    [Style.overlay]: true,
    [Style.visible]: isOpen,
    [Style.hidden]: !isOpen
  });


  return (
    <div id={id} className={overlayClassName}>
      <div className={Style.popup}>
        <Loading
          color="green"
          isLoading={isLoading}
        >
          <div className={Style.popupHeader}>
            <div className={Style.title}>
              {title}
            </div>
            {
              !!onClose &&
              <div className={Style.cancelIconHolder} onClick={close}>
                <Icon icon={'cancel'} className={Style.cancelIcon} />
              </div>
            }
          </div>
          {/* <form onSubmit={submit}> */}
          <div className={Style.popupBody}>
            {children}
          </div>
          <div className={Style.actionHolder}>
            <button
              type="submit"
              className={Style.action}
              onClick={submit}
              tabIndex={0}
            >
              {action}
            </button>
          </div>
          {/* </form> */}
        </Loading>
      </div>
    </div>
  );
}
