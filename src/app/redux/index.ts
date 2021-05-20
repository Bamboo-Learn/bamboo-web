import { combineReducers } from 'redux';

import { libraryReducer, LibraryStateType } from './library'
import { filterReducer, FilterStateType } from './filter';
import { settingsReducer, SettingsStateType } from './settings';

export type ReducerStateType = {
  library: LibraryStateType,
  filter: FilterStateType
  settings: SettingsStateType
};

export const reducer = combineReducers({
  library: libraryReducer,
  filter: filterReducer,
  setttings: settingsReducer
});

export * from './library';
export * from './filter';
export * from './settings';