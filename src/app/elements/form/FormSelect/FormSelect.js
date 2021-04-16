import React from "react";

import Style from "../style.module.css";

export class FormSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.onChange(e);
  }

  render() {
    return (
      <select
        className={Style.Input}
        placeholder={this.props.placeholder}
        value={this.props.value || ""}
        onChange={this.onChange}
      >
        {this.props.options.map(({value, label}) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    );
  }
}
