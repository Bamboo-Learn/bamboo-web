
// import { combineReducers } from 'redux'

import { ADD_PHRASE, DELETE_PHRASE, EDIT_PHRASE, CHANGE_PAGE, CHANGE_DISPLAY_CHARACTER_SETTING } from './actions.js';

const initState = {
  page: 'library', // TODO: should this just be in the url?
  // user data
  displayCharacterSet: 'trad',
  totalLibrarySize: 0,
  packs: [],
  phrases: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PHRASE:
      return { ...state, ...{ phrases: [...state.phrases, action.addPhrase] } };
    case DELETE_PHRASE:
      return { ...state, ...{ phrases: state.phrases.filter(p => p._id !== action.removePhrase._id) } };
    case EDIT_PHRASE:
      return { ...state, ...{ page: action.page } };
    case CHANGE_PAGE:
      return { ...state, ...{ page: action.page } };
    case CHANGE_DISPLAY_CHARACTER_SETTING:
      return { ...state, ...{ displayCharacterSet: action.displayCharacterSet } };
    default:
      return state;
  }
}

// export default combineReducers({
// });

export { reducer };
