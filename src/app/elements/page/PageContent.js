import React from "react";

import { Loading } from "app/elements";

import Style from "./style.module.css";

class PageContent extends React.Component {
  render() {
    const { children, isLoading } = this.props;
    return (
      <Loading
        color="green"
        isLoading={isLoading}
      >
        <div className={Style.content}>{children}</div>
      </Loading>
    );
  }
}

export { PageContent };
