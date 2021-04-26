import React from "react";

import Style from "./style.module.css";

class Pack extends React.Component {
  render() {
    const { name, cardCount } = this.props;
    return (
      <div className={Style.packHolder}>
        <div className={Style.pack}>
          <div className={Style.name}>{name}</div>
          <div className={Style.cardCount}>{cardCount} {` cards`}</div>
        </div>
      </div>
    );
  }
}

class NewPack extends React.Component {
  render() {
    return (
      <div className={Style.packHolder}>
        <div className={Style.pack}>
          <div className={Style.name}>Add New</div>
        </div>
      </div>
    );
  }
}

export { Pack, NewPack };
