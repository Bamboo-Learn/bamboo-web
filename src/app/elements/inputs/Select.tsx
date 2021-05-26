import React, { FC } from "react";

export type SelectPropTypes = {
  options: {
    label: string
    value: string
  }[];
  value: string
  onChange: any
  name?: string
  className?: string
}

export const Select: FC<SelectPropTypes> = ({ options, value, className, onChange }) => {

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

