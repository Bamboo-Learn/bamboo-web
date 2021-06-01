import React, { FC } from "react";

import { progressBackground } from 'app/elements';

import Style from './style.module.scss'

export type SliderPropTypes = {
  value: number
  onChange: (e: any) => void
  style?: any
  className?: string
  name: string
}

// TODO: too many styles here?
export const InputSlider: FC<SliderPropTypes> = ({ value, className, onChange, style, name }) => {

  const onSliderChange = (e: any) => {
    e.preventDefault();
    onChange(e);
  };

  return (
    <input
      name={name}
      type="range"
      min={0.00} // TODO: make this variable
      max={1.00}
      step={0.01}
      className={`${Style.slider} ${className}`}
      value={value}
      style={style || progressBackground(value)}
      onChange={onSliderChange}
    />
  );

};

