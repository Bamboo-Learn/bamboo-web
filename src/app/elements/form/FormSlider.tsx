
import React, { FC } from 'react';

import { SliderPropTypes, InputSlider } from 'app/elements';

import Style from './style.module.scss';

export const FormSlider: FC<SliderPropTypes> = (props) => {
  return (
    <div className={Style.formSliderHolder}>
      <InputSlider {...props} />
    </div>
  );
}

