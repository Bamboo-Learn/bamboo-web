import { List } from 'immutable';

import { DBPhrase, DBPhraseInterface } from 'app/classes';

// Library Types

export type LibraryStateType = {
  phrases: List<DBPhrase>,
  packs: { name: string, count: number }[],
  totalSize: number
}

type LibraryAction = {
  type: string,
  appendPhrases?: DBPhraseInterface[],
  updatePhrase?: DBPhrase,
  removePhrase?: DBPhrase
}

// Library Actions

const APPEND_PHRASES = 'APPEND_PHRASES'; // append phrases to the library from load
const REMOVE_PHRASE = 'REMOVE_PHRASE'; // requires change to total count and possibly pack list
const UPDATE_PHRASE = 'UPDATE_PHRASE'; // possibly requires change to pack list

export const appendPhrases = (appendPhrases: DBPhraseInterface[]): LibraryAction => ({
  type: APPEND_PHRASES,
  appendPhrases: appendPhrases.filter(phrase => !!phrase._id)
});

export const updatePhrase = (updatePhrase: DBPhrase): LibraryAction => ({
  type: UPDATE_PHRASE,
  updatePhrase
});

export const removePhrase = (removePhrase: DBPhrase): LibraryAction => ({
  type: REMOVE_PHRASE,
  removePhrase
});


// Library Reducer

const initLibrary: LibraryStateType = {
  phrases: List([]),
  packs: [],
  totalSize: 0,
};

export const libraryReducer = (state = initLibrary, action: LibraryAction): LibraryStateType => {
  switch (action.type) {
    case APPEND_PHRASES:
      if (!action.appendPhrases || action.appendPhrases.length === 0) {
        break;
      }
      const currentPhrases = state.phrases.toArray();
      action.appendPhrases?.forEach((newPhrase: DBPhraseInterface) => {
        const duplicatePhrase = currentPhrases.find((existingPhrase: DBPhrase) => existingPhrase._id.equals(newPhrase._id));
        if (!duplicatePhrase) {
          currentPhrases.push(new DBPhrase(newPhrase));
        }
      });
      return { ...state, ...{ phrases: List(currentPhrases) } };
    case UPDATE_PHRASE:
      if (!action.updatePhrase) {
        break;
      }
      const index = state.phrases.findIndex((phrase) => phrase._id === action.updatePhrase?._id);
      const newUpdatedPhrases = state.phrases.set(index, action.updatePhrase);
      return { ...state, ...{ phrases: newUpdatedPhrases } };
    case REMOVE_PHRASE:
      if (!action.removePhrase) {
        break;
      }
      const newDeletedPhrases = state.phrases.filter((phrase) => action.removePhrase?._id !== phrase._id);
      return { ...state, ...{ phrases: newDeletedPhrases } };
  }
  return state;
}

