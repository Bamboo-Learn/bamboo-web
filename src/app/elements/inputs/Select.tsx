import React, { FC } from "react";

export type SelectPropTypes = {
  options: {
    label: string
    value: string
  }[];
  value: string
  onChange: any
}

type DecoratedSelectPropTypes = SelectPropTypes & {
  className: string
};

export const Select: FC<DecoratedSelectPropTypes> = ({ options, value, className, onChange }) => {

  const onSelectChange = (e: any) => {
    e.preventDefault();
    onChange(e);
  };

  return (
    <select
      className={className}
      value={value || ""}
      onChange={onSelectChange}
    >
      {
        options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))
      }
    </select>
  );

};

