
import { Filter } from './reducers';

import { Mongodb, DBPhraseInterface, Phrase } from 'app/helpers'
import { BSON } from 'realm-web';


// Action Types

// library
export const APPEND_PHRASES = 1; // append phrases to the library from load
export const DELETE_PHRASE = 2; // requires change to total count and possibly pack list
export const UPDATE_PHRASE = 3; // possibly requires change to pack list
export const ADD_NEW_PHRASE = 4; // TODO: necessary? append a new phrase, requires change to total count and possibly pack list

// filter
export const CHANGE_FILTER = 5;

// settings
export const CHANGE_DISPLAY_CHARACTER_SETTING = 6;


// Action Callers

export const appendPhrases = (phrases: DBPhraseInterface[]) => ({
  type: APPEND_PHRASES,
  phrases
});

export const updatePhrase = (id: BSON.ObjectID, updatePhrase: Phrase) => ({
  type: UPDATE_PHRASE,
  id, updatePhrase
});

export const deletePhrase = (id: BSON.ObjectID) => ({
  type: DELETE_PHRASE,
  id
});


// TODO: we are doing infinite scroll, so page should reset to 0
// after every filter update that isn't a page update

// create the update filter dispatching function
export const updateFilter = (() => {
  const filterHistory = new Set();
  // returns a function that can be dispatched
  return ({ filter }: { filter: Filter }) => {
    // if we have not used this filter before
    if (!filterHistory.has(filter)) {
      // add the filter and load new phrases
      filterHistory.add(filter);
      return (dispatch: any) => {
        // TODO: dispatch a page loading
        Mongodb.getPhrases(filter).then((loadedPhrases) => {
          // then dispatch append phrases and update the filter
          dispatch(appendPhrases(loadedPhrases));
          dispatch({ type: CHANGE_FILTER, filter });
        });
      }
    }
    return { type: CHANGE_FILTER, filter };
  }
})(); // closure to wrap filterHistory
