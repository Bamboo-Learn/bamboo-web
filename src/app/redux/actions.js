
// library
export const APPEND_PHRASES = 1; // append phrases to the library from load
export const DELETE_PHRASE = 2; // requires change to total count and possibly pack list
export const EDIT_PHRASE = 3; // possibly requires change to pack list
export const ADD_NEW_PHRASE = 4; // append a new phrase, requires change to total count and possibly pack list

// filter
export const CHANGE_FILTER = 5;

// settings
export const CHANGE_DISPLAY_CHARACTER_SETTING = 6;


// create the update filter dispatching function
export const updateFilter = (() => {
  const filterHistory = [];
  // returns a function that can be dispatched
  return ({ filter, mongodb }) => {
    const filterString = JSON.stringify(filter);
    // if we have not used this filter before
    if (!filterHistory.includes(filterString)) {
      // add the filter and load new phrases
      filterHistory.push(filterString);
      return (dispatch) => {
        mongodb.getPhrases(filter).then((loadedPhrases) => {
          // then dispatch append phrases and update the filter
          dispatch(appendPhrases(loadedPhrases));
          dispatch({ type: CHANGE_FILTER, filter });
        });
      }
    }
    return { type: CHANGE_FILTER, filter };
  }
})(); // closure to wrap filterHistory


export const appendPhrases = (phrases) => ({
  type: APPEND_PHRASES,
  phrases
});

