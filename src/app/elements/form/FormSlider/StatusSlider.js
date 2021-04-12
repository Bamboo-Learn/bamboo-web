

import React from 'react';
import { FormRow } from '../FormRow.js';


<StatusSlider
  emptyLabel="To Learn"
  middleLabel="Learning"
  fullLabel="Learned"
  value
  setValue
  min
  max
  step

/>


import Style from './style.module.css';

function sliderBackground(slider) {
  const fill = '33a853';
  const back = 'daeedd';
  const percent = 100 * slider / 10;
  return {
    background: `
      linear-gradient(
        90deg, 
        #${fill} 0%, 
        #${fill} ${percent}%,
        #${back} ${percent}%,
        #${back} 100%
      )`
  };
}

export class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.props.onChange(e);
  }

  render() {
    const value = this.props.value || 0;
    // const valueClass = (value === 0) ? 'Empty' : (value === 10) ? 'Full' : '';
    return (
      <FormRow
        isError={this.props.isError}
        icon={this.props.icon}
        label={this.props.label}
      >
        {/* TODO: move this input row out of here and use it in the actual form, call it FormRow */}
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={value}
          className={Style.Slider}
          style={sliderBackground(value)}
          onChange={this.onChange}
        />
      </FormRow>
    );
  }
}

