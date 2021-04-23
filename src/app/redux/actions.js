
// append phrases to the library
export const APPEND_PHRASES = 1;
export const DELETE_PHRASE = 2;
export const EDIT_PHRASE = 3;
// append a new phrase
export const ADD_NEW_PHRASE = 4;

export const CHANGE_FILTER = 5;

// settings
export const CHANGE_DISPLAY_CHARACTER_SETTING = 6;

// closure to wrap filterHistory
function makeUpdateFilter() {
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
          return { type: CHANGE_FILTER, filter };
        });
      }
    } else {
      return { type: CHANGE_FILTER, filter }
    }
  }
}

// create the update filter dispatching function
export const updateFilter = makeUpdateFilter();

export const appendPhrases = (phrases) => ({
  type: APPEND_PHRASES,
  phrases
});

