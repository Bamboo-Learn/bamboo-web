import { BSON } from 'realm-web';
import _ from 'lodash';

import { Mongodb } from './mongodb';
import { isSet } from './utils'

// Interface

/**
 * @interface PhraseInterface
 * represents a new phrase data before db insertion
 */
export interface PhraseInterface {
  characters: string
  pinyin: string
  english: string
  pack: string
  progress: number

  // legacy
  category?: string
  confidence?: number
}

/**
 * @interface DBPhraseInsertableInterface
 * represents a phrase that can be inserted into the database
 */
interface DBPhraseInsertableInterface extends PhraseInterface {
  _id?: BSON.ObjectID // _id is not required for insert, required for update
  owner_id: string
  created_at: Date
}

/**
 * @interface DBPhraseInterface
 * represents a phrase in as it is stored in the db
 */
export interface DBPhraseInterface extends DBPhraseInsertableInterface {
  _id: BSON.ObjectID
}

/**
 * @class Phrase
 * Immutable object that represents a phrase
 * and holds helper functions and setter functions
 */
export class Phrase implements PhraseInterface {

  characters: string
  pinyin: string
  pack: string
  progress: number
  english: string

  constructor(phrase: PhraseInterface, unlocked: boolean = false) {
    this.characters = phrase.characters || '';
    this.pinyin = phrase.pinyin || '';
    this.english = phrase.english || '';
    this.pack = phrase.pack || '';
    this.progress = ((): number => {
      if (phrase.progress !== undefined) {
        return phrase.progress;
      } else if (phrase.confidence !== undefined) {
        return phrase.confidence / 10;
      }
      return 0;
    })();

    if (!unlocked) {
      Object.preventExtensions(this);
      Object.freeze(this);
    }
  }

  // Immutable Functions

  /**
   * 
   * @param field a name of a field
   * @param value a new value for the field
   * @returns a new Phrase with those parameters set
   */
  set(field: string, value: string | number | BSON.ObjectID): Phrase | DBPhrase {
    return new Phrase({ ...this, [field]: value });
  }

  /**
   * @returns a new Phrase with the progress changed between top, middle, and bottom
   */
  cycleStatus(): Phrase | DBPhrase {
    let progress = 1.0;
    switch (this.progress) {
      case 0.0:
        progress = 0.5;
        break;
      case 1.0:
        progress = 0.0;
        break;
    }
    return this.set('progress', progress);
  }

  autofill(lookupChars: { character: string, english: string, pinyin: string }[], fields: { english: boolean, pinyin: boolean }): Phrase | DBPhrase {
    let pinyin: string[] = [];
    let english: string[] = [];
    this.characters.split('').forEach((character, i) => {
      const lookupChar = lookupChars.find(luc => luc.character === character);
      if (!lookupChar) {
        english.push('_');
        pinyin.push('_');
      } else {
        english.push(lookupChar.english);
        pinyin.push(lookupChar.pinyin[0]);
      }
    });
    let newPhrase: Phrase = this;
    if (fields.english) {
      newPhrase = newPhrase.set('english', english.join(' | '));
    }
    if (fields.pinyin) {
      newPhrase = newPhrase.set('pinyin', pinyin.join(' '));
    }
    return newPhrase;
  }

  /**
   * @returns an Immutable copy of this phrase
   */
  copy(): Phrase | DBPhrase {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  /**
   * @method save (does not save to db)
   * @param _id new ObjectID for this phrase
   * @param created_at time the phrase was created
   * @returns a DBPhrase with the new data
   */
  // convertToDBPhrase({ _id, created_at }: { _id: BSON.ObjectID, created_at: Date }): DBPhrase {
  //   return new DBPhrase({
  //     ...this,
  //     _id, created_at,
  //     owner_id: Mongodb.userID(),
  //   });
  // }

  // Helper Functions

  /**
   * @returns true if required fields are blank 
   */
  isMissingRequiredField(): boolean {
    return !isSet(this.characters);
  }

  /**
   * @param originalPhrase the original phrase (as stored in the Library or DEFAULT)
   * @returns true when this phrase data is not equal to the original
   */
  isEdited(originalPhrase: Phrase): boolean {
    return !_.isEqual(originalPhrase.toData(), this.toData());
  }

  // it is saveable if it has been edited, is not missing fields
  /**
   * @param originalPhrase the original phrase (as stored in the Library or DEFAULT)
   * @returns true when the phrase is edited and is not missing required fields
   */
  isSaveable(originalPhrase: Phrase): boolean {
    return this.isEdited(originalPhrase) && !this.isMissingRequiredField()
  }

  /**
   * @returns true when able to be autofilled
   */
  canAutoFill(): boolean {
    return this.characters.length > 0 && (
      this.pinyin.length === 0 || this.english.length === 0
    );
  }

  // Data

  /**
   * @returns phrase information as data
   */
  toData(): PhraseInterface {
    return {
      characters: this.characters,
      pinyin: this.pinyin,
      pack: this.pack,
      progress: this.progress,
      english: this.english,
    }
  }

  /**
   * @returns data for a new phrase in DB
   * hold onto created_at for save() method
   */
  makeStorableData(): DBPhraseInsertableInterface {
    return {
      ...this.toData(),
      owner_id: Mongodb.userID(),
      created_at: new Date()
    }
  }
}

const DEFAULT_PHRASE_DATA: PhraseInterface = {
  characters: '',
  progress: 0,
  pinyin: '',
  english: '',
  pack: ''
}

export const makeNewPhrase = () => new Phrase(DEFAULT_PHRASE_DATA);

/**
 * @class DBPhrase
 * Immutable Phrase represents a phrase as it is stored in DB
 */
export class DBPhrase extends Phrase implements DBPhraseInterface {

  _id: BSON.ObjectID
  created_at: Date
  owner_id: string

  constructor(phrase: DBPhraseInterface) {
    super(phrase, true);
    this._id = phrase._id;
    this.created_at = phrase.created_at;
    this.owner_id = phrase.owner_id || Mongodb.userID();

    Object.preventExtensions(this);
    Object.freeze(this);
  }

  makeStorableData(): DBPhraseInterface {
    return {
      ...this.toData(),
      _id: this._id,
      owner_id: Mongodb.userID(),
      created_at: this.created_at || new Date()
    };
  }
}
