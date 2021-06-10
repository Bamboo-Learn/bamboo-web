import { List } from 'immutable';
import { BSON } from 'realm-web';

import { DBPhrase, DBPhraseInterface } from 'app/classes';

// Library Actions

type LibraryActionType = {
  type: string,
  appendPhrases?: DBPhraseInterface[],
  phrase?: DBPhrase,
}

const APPEND_NEW_PHRASE = 'APPEND_NEW_PHRASE';
const APPEND_PHRASES_FROM_LOAD = 'APPEND_PHRASES_FROM_LOAD'; // append phrases to the library from load
const REMOVE_PHRASE = 'REMOVE_PHRASE'; // requires change to total count and possibly pack list
const UPDATE_PHRASE = 'UPDATE_PHRASE'; // possibly requires change to pack list

export const LibraryActions = {
  appendPhrasesFromLoad: (appendPhrases: DBPhraseInterface[]): LibraryActionType => ({
    type: APPEND_PHRASES_FROM_LOAD,
    appendPhrases: appendPhrases.filter(phrase => !!phrase._id)
  }),
  appendNewPhrase: (phrase: DBPhrase): LibraryActionType => ({
    type: APPEND_NEW_PHRASE,
    phrase
  }),
  updatePhrase: (phrase: DBPhrase): LibraryActionType => ({
    type: UPDATE_PHRASE,
    phrase
  }),
  removePhrase: (phrase: DBPhrase): LibraryActionType => ({
    type: REMOVE_PHRASE,
    phrase
  })
};

// Library Reducer

export type LoadMoreMarker = boolean;

export type LibraryStateType = {
  phrases: List<DBPhrase>,
  lastLoadedPhraseID?: BSON.ObjectID
  packs: { name: string, count: number }[],
  totalSize: number
}

const appendNewPhrase = (state: LibraryStateType, phrase: DBPhrase): LibraryStateType => {
  const currentPhrases = state.phrases.toArray();
  currentPhrases.push(phrase);
  return {
    ...state,
    ...{
      phrases: List(currentPhrases),
    }
  };
}

const appendLoadedPhrases = (state: LibraryStateType, appendPhrases: DBPhraseInterface[]): LibraryStateType => {
  const currentPhrases = state.phrases.toArray();
  appendPhrases.forEach((newPhrase: DBPhraseInterface) => {
    const duplicatePhrase = currentPhrases.find((existingPhrase: DBPhrase) => existingPhrase._id.equals(newPhrase._id));
    if (!duplicatePhrase) {
      currentPhrases.push(new DBPhrase(newPhrase));
    }
  });
  return {
    ...state,
    ...{
      phrases: List(currentPhrases),
      lastLoadedPhraseID: appendPhrases[appendPhrases.length - 1]._id // TODO: use this to insert the load more button
    }
  };
}

const updatePhrase = (state: LibraryStateType, phrase: DBPhrase): LibraryStateType => {
  const index = state.phrases.findIndex((p) => p._id === phrase._id);
  const newUpdatedPhrases = state.phrases.set(index, phrase);
  return { ...state, ...{ phrases: newUpdatedPhrases } };
}

const removePhrase = (state: LibraryStateType, phrase: DBPhrase): LibraryStateType => {
  const newRemovedPhrases = state.phrases.filter((p) => phrase._id !== p._id);
  return { ...state, ...{ phrases: newRemovedPhrases } };
}

const initLibraryState: LibraryStateType = {
  phrases: List([]),
  packs: [],
  totalSize: 0,
};

export const libraryReducer = (state: LibraryStateType = initLibraryState, action: LibraryActionType): LibraryStateType => {
  switch (action.type) {
    case APPEND_NEW_PHRASE:
      if (!action.phrase) {
        break;
      }
      return appendNewPhrase(state, action.phrase);
    case APPEND_PHRASES_FROM_LOAD:
      if (!action.appendPhrases || action.appendPhrases.length === 0) {
        break;
      }
      return appendLoadedPhrases(state, action.appendPhrases)
    case UPDATE_PHRASE:
      if (!action.phrase) {
        break;
      }
      return updatePhrase(state, action.phrase);
    case REMOVE_PHRASE:
      if (!action.phrase) {
        break;
      }
      return removePhrase(state, action.phrase);
  }
  return state;
}

