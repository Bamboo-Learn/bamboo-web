import React from "react";

import Style from "../style.module.css";

class FormSelect extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.onChange(e);
  }

  render() {
    const { options, value } = this.props;
    return (
      <select
        className={Style.Input}
        value={value || ""}
        onChange={this.onChange}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    );
  }
}

export { FormSelect };