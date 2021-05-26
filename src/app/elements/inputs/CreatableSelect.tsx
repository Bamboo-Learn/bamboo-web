import React, { FC } from 'react'

import { SelectPropTypes } from './Select';

// import Style from './style.module.scss';

type CreatableSelectProps = SelectPropTypes & {


}

export const CreatableSelect: FC<CreatableSelectProps> = ({
  options,
  value,
  onChange,
  name,
  className
}) => {
  return (
    <></>
    // <Creatable
    //   options={options}
    //   value={options.find(o => o.value === value) || null}
    //   onChange={onChange}
    //   name={name}
    //   className={`${Style.creatableSelect} ${className}`}
    // />
  );
}