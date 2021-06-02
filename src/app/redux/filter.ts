import { Mongodb } from 'app/classes'

import { LibraryActions } from './library';


// Filter Actions

type FilterActionType = {
  type: string,
  filter: FilterStateType
}

const CHANGE_FILTER = 'CHANGE_FILTER';

// TODO: we are doing infinite scroll, so page should reset to 0
// after every filter update that isn't a page update

// create the update filter dispatching function
export const updateFilter = (() => {
  const filterHistory = new Set();
  // returns a function that can be dispatched
  return ({ filter }: { filter: FilterStateType }) => {
    // if we have not used this filter before
    if (!filterHistory.has(filter)) {
      // add the filter and load new phrases
      filterHistory.add(filter);
      return (dispatch: any) => {
        // TODO: dispatch a page loading here
        // dispatch(PageActions.pageLoading(true))
        Mongodb.getPhrases(filter).then((loadedPhrases) => {
          // then dispatch append phrases and update the filter
          dispatch(LibraryActions.appendPhrasesFromLoad(loadedPhrases));
          dispatch({ type: CHANGE_FILTER, filter });
          // TODO: dispatch PageActions.pageLoadingFalse
        });
      }
    }
    return { type: CHANGE_FILTER, filter };
  }
})(); // closure to wrap filterHistory


// Filter Reducer

export type FilterStateType = {
  perPage: number,
  orderBy: 'created_at' | 'characters' | 'pinyin' | 'english',
  order: number,
  page: number,
  search: string,
  pack: string
}

const initFilter: FilterStateType = {
  perPage: 30,
  orderBy: 'created_at', // init created_at
  order: -1, // descending, this is most recent first
  page: 0,
  search: '',
  pack: ''
}

export const filterReducer = (state = initFilter, action: FilterActionType) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return { ...action.filter }
    default:
      return state;
  }
}
