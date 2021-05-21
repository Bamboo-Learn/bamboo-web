import React, { FC } from "react";

import { confidenceBackground } from 'app/elements';

import Style from './style.module.scss'

export type SliderPropTypes = {
  value: number
  onChange: (e: any) => void
  style?: any
  className?: string
}

// TODO: too many styles here?
export const InputSlider: FC<SliderPropTypes> = ({ value, className, onChange, style }) => {

  const onSliderChange = (e: any) => {
    e.preventDefault();
    onChange(e);
  };

  return (
    <input
      type="range"
      min="0" // TODO: make this variable
      max="1"
      step="0.01"
      className={`${Style.slider} ${className}`}
      value={value}
      style={style || confidenceBackground(value)}
      onChange={onSliderChange}
    />
  );

};

