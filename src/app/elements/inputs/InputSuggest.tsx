import React, { FC, useState } from 'react'
import Autosuggest from 'react-autosuggest';
import { trim, lowerCase } from 'lodash'

import { InputSelectPropTypes, OptionType } from './InputSelect';

// import Style from './style.module.scss';
import './react-autosuggest.style.css';

export type InputSuggestPropTypes = InputSelectPropTypes & {
  placeholder?: string
}

const getSuggestionValue = (value: string) => value;

const getSuggestions = ({ options, value }: { options: OptionType[], value: string }): string[] => {
  const inputValue = lowerCase(trim(value));
  const inputLength = inputValue.length;

  return options.filter(o =>
    lowerCase(o.value).slice(0, inputLength) === inputValue
  ).map(o => o.label);
};

const renderSuggestion = (value: string) => {
  return (
    <div>{value}</div>
  )
}

export const InputSuggest: FC<InputSuggestPropTypes> = ({
  options,
  value,
  onChange,
  name,
  className,
  placeholder
}) => {

  // default to all
  const defaultOptions = options.map(o => o.label);
  const [suggestions, setSuggestions] = useState<string[]>(defaultOptions);

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions({ options, value }))

  };

  const onSuggestionsClearRequested = () => {
    setSuggestions(defaultOptions);
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      shouldRenderSuggestions={() => true} // always render suggestions
      inputProps={{
        value, onChange, name, className, placeholder
      }}
      multiSection={false}
    />
  );
}