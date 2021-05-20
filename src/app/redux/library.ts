import { List } from 'immutable';
import { BSON } from 'realm-web';

import { Phrase, DBPhraseInterface } from 'app/helpers';

// Library Types

export type LibraryStateType = {
  phrases: List<Phrase>,
  packs: { name: string, count: number }[],
  totalSize: number
}

type LibraryAction = {
  type: number,
  phrases?: DBPhraseInterface[],
  updatePhrase?: Phrase,
  removePhrase?: DBPhraseInterface
}

// Library Actions

const APPEND_PHRASES = 1; // append phrases to the library from load
const DELETE_PHRASE = 2; // requires change to total count and possibly pack list
const UPDATE_PHRASE = 3; // possibly requires change to pack list
// const ADD_NEW_PHRASE = 4; // TODO: necessary? append a new phrase, requires change to total count and possibly pack list

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


// Library Reducer

const initLibrary: LibraryStateType = {
  phrases: List([]),
  packs: [],
  totalSize: 0,
};

export const libraryReducer = (state = initLibrary, action: LibraryAction): LibraryStateType => {
  switch (action.type) {
    case APPEND_PHRASES:
      if (!action.phrases) {
        break;
      }
      const appendedPhrases = state.phrases.toArray();
      action.phrases?.forEach((newPhrase: DBPhraseInterface) => {
        const duplicatePhrase = appendedPhrases.find((existingPhrase: Phrase) => existingPhrase._id.equals(newPhrase._id));
        if (!duplicatePhrase) {
          appendedPhrases.push(new Phrase(newPhrase));
        }
      });
      return { ...state, ...{ phrases: List(appendedPhrases) } };
    case UPDATE_PHRASE:
      if (!action.updatePhrase) {
        break;
      }
      const index = state.phrases.findIndex((phrase) => phrase._id === action.updatePhrase?._id)
      const newUpdatedPhrases = state.phrases.set(index, action.updatePhrase);
      return { ...state, ...{ phrases: newUpdatedPhrases } };
    case DELETE_PHRASE:
      if (!action.removePhrase) {
        break;
      }
      const newDeletedPhrases = state.phrases.filter((phrase) => action.removePhrase?._id !== phrase._id);
      return { ...state, ...{ phrases: newDeletedPhrases } };
  }
  return state;
}

