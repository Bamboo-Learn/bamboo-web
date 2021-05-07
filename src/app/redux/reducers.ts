
import { combineReducers } from 'redux';

import { Phrase, DBPhraseInterface } from 'app/helpers';

import { APPEND_PHRASES, DELETE_PHRASE, EDIT_PHRASE, CHANGE_DISPLAY_CHARACTER_SETTING, CHANGE_FILTER } from './actions';

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
  phrases: Phrase[],
  packs: { name: string, count: number }[],
  totalSize: number
}

const initLibrary: Library = {
  phrases: [],
  packs: [],
  totalSize: 0,
};

const libraryReducer = (state = initLibrary, action: any) => {
  switch (action.type) {
    case APPEND_PHRASES:
      const phrases = [...state.phrases];
      action.phrases.forEach((phrase: DBPhraseInterface) => {
        const existingPhrase = phrases.find((p: Phrase) => p._id.equals(phrase._id))
        if (!existingPhrase) {
          // if not already in the array then add it
          phrases.push(new Phrase(phrase));
        }
      });
      return { ...state, ...{ phrases } };
    case DELETE_PHRASE:
      return { ...state, ...{ phrases: state.phrases.filter(p => p._id !== action.removePhrase._id) } };
    case EDIT_PHRASE:
      // find the phrases in the array by id and change the data
      return { ...state }
    default:
      return state;
  }
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

const reducer = combineReducers({
  filter: filterReducer,
  library: libraryReducer,
  setttings: settingsReducer
});

export { reducer };
