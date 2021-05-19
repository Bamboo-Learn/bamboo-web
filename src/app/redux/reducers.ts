import { List, Set } from 'immutable'
import { combineReducers } from 'redux';

import { Phrase, DBPhraseInterface } from 'app/helpers';

import { APPEND_PHRASES, DELETE_PHRASE, CHANGE_DISPLAY_CHARACTER_SETTING, CHANGE_FILTER, UPDATE_PHRASE } from './actions';

// Filter Reducer

export interface Filter {
  perPage: number,
  orderBy: string,
  order: number,
  page: number,
  search: string,
  pack: string
}

const initFilter: Filter = {
  perPage: 30,
  orderBy: '',
  order: 1,
  page: 0,
  search: '',
  pack: ''
}

const filterReducer = (state = initFilter, action: any) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...action.filter }
    default:
      return state;
  }
}

// Library Reducer

export interface Library {
  phrases: List<Phrase>,
  packs: { name: string, count: number }[],
  totalSize: number
}

const initLibrary: Library = {
  phrases: List([]),
  packs: [],
  totalSize: 0,
};

const libraryReducer = (state = initLibrary, action: any): Library => {
  switch (action.type) {
    case APPEND_PHRASES:
      const newAppendedPhrases = Set.union<Phrase>([
        action.phrases.map((phrase: DBPhraseInterface) => new Phrase(phrase)),
        state.phrases
      ]).toList();
      return { ...state, ...{ phrases: newAppendedPhrases } };
    case UPDATE_PHRASE:
      const index = state.phrases.findIndex((phrase) => phrase._id === action.updatePhrase._id)
      const newUpdatedPhrases = state.phrases.set(index, action.updatePhrase);
      return { ...state, ...{ phrases: newUpdatedPhrases } };
    case DELETE_PHRASE:
      const newDeletedPhrases = state.phrases.delete(action.removePhrase);
      return { ...state, ...{ phrases: newDeletedPhrases } };
  }
  return state;
}

// Settings Reducer

interface Settings {
  displayCharacterSet: 'simp' | 'trad'
}

const initSettings: Settings = {
  // user data
  displayCharacterSet: 'trad',
};

const settingsReducer = (state = initSettings, action: any) => {
  switch (action.type) {
    case CHANGE_DISPLAY_CHARACTER_SETTING:
      return { ...state, ...{ displayCharacterSet: action.displayCharacterSet } };
    default:
      return state;
  }
}

// TODO: Page Reducer

// const initPage = {
//   isLoading: true
// };

export type ReducerStateType = {
  library: Library,
  filter: Filter
  settings: Settings
};

export const reducer = combineReducers({
  filter: filterReducer,
  library: libraryReducer,
  setttings: settingsReducer
});

