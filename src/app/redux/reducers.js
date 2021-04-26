
import { combineReducers } from 'redux';

import { Phrase } from 'app/helpers';

import { APPEND_PHRASES, DELETE_PHRASE, EDIT_PHRASE, CHANGE_DISPLAY_CHARACTER_SETTING, CHANGE_FILTER } from './actions.js';

// Filter Reducer

const initFilter = {
  perPage: 30,
  orderBy: '',
  reverse: false,
  page: 0,
  search: '',
  pack: ''
}

const filterReducer = (state = initFilter, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...action.filter }
    default:
      return state;
  }
}

// Library Reducer

const initLibrary = {
  phrases: [],
  packs: [],
  totalSize: 0,
};

const libraryReducer = (state = initLibrary, action) => {
  switch (action.type) {
    case APPEND_PHRASES:
      const phrases = [...state.phrases];
      action.phrases.forEach((phrase) => {
        const existingPhrase = phrases.find(p => p._id.equals(phrase._id))
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

const initSettings = {
  // user data
  displayCharacterSet: 'trad',
};

const settingsReducer = (state = initSettings, action) => {
  switch (action.type) {
    case CHANGE_DISPLAY_CHARACTER_SETTING:
      return { ...state, ...{ displayCharacterSet: action.displayCharacterSet } };
    default:
      return state;
  }
}

const reducer = combineReducers({
  filter: filterReducer,
  library: libraryReducer,
  setttings: settingsReducer
});

export { reducer };
