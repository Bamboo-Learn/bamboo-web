import React, { FC } from "react";

export type OptionType = {
  label: string
  value: string
};

export type InputSelectPropTypes = {
  options: OptionType[];
  value: string
  onChange: any
  name?: string
  className?: string
}

export const InputSelect: FC<InputSelectPropTypes> = ({ options, value, className, onChange }) => {

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

