import { BSON } from 'realm-web';
import _ from 'lodash';

import { Mongodb } from './mongodb';
import { isSet } from './utils'

// Interface

export interface PhraseInterface {
  characters: string
  pinyin: string
  english: string
  pack: string
  progress: number
  [propname: string]: any
}

export interface DBPhraseInterface extends PhraseInterface {
  _id: BSON.ObjectID
  owner_id: string
  created_at: Date
  // legacy
  category?: string
  confidence?: number
}

// Phrase Class

export class Phrase implements PhraseInterface, DBPhraseInterface {

  _id: BSON.ObjectID
  created_at: Date
  owner_id: string
  characters: string
  pinyin: string
  pack: string
  progress: number
  english: string
  category?: string
  confidence?: number

  constructor(phrase: PhraseInterface | DBPhraseInterface) {
    this._id = phrase._id || undefined;
    this.created_at = phrase.created_at || undefined;
    this.owner_id = phrase.owner_id || undefined;
    this.characters = phrase.characters || '';
    this.pinyin = phrase.pinyin || '';
    this.english = phrase.english || '';
    this.pack = phrase.pack || '';
    this.progress = phrase.progress === undefined ? phrase.confidence / 10 || 0 : phrase.progress;

    this.confidence = phrase.confidence;
    this.category = phrase.category;

    Object.preventExtensions(this);
    Object.freeze(this);
  }

  // Immutable Functions

  // set a field
  set(field: string, value: string | number | BSON.ObjectID): Phrase {
    return new Phrase({ ...this, [field]: value });
  }

  // sets the _id after insert (does not save to db)
  save({ insertedId }: { insertedId: BSON.ObjectID }): Phrase {
    return this.set('_id', insertedId);
  }

  // takes the original and sets the actual to that (erases changes)
  revert(phrases: Phrase[]): Phrase | undefined {
    return this.getOriginal(phrases);
  }

  // changes the confidence
  cycleStatus(): Phrase {
    let confidence = 1.0;
    switch (this.confidence) {
      case 0.0:
        confidence = 0.5;
        break;
      case 1.0:
        confidence = 0.0;
        break;
    }
    return this.set('confidence', confidence);
  }

  autofill(lookupChars: { character: string, english: string, pinyin: string }[], fields: { english: boolean, pinyin: boolean }): Phrase {
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

  makeStorable(): Phrase {
    return new Phrase({
      ...this.toData(),
      _id: this._id,
      owner_id: Mongodb.userID(),
      created_at: this.created_at || new Date()
    });
  }

  copy(): Phrase {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  // Helper Functions

  getOriginal(phrases: Phrase[]): Phrase | undefined {
    return phrases.find((phrase) => this._id === phrase._id);
  }

  // returns true if fields are blank
  isMissingRequiredField(): boolean {
    return !isSet(this.characters);
  }

  // returns true when this phrase has been edited
  isEdited(phrase: Phrase): boolean {
    return !_.isEqual(phrase.toData(), this.toData());
  }

  // this function is a little useless as it only can check duplicates
  // of already loaded phrases
  isDuplicate(phrases: Phrase[]): boolean {
    return phrases.some(phrase => phrase.characters === this.characters);
  }

  isSaveable(originalPhrase: Phrase): boolean { // phrases: Phrase[]
    // it is saveable if it has been edited, is not missing fields, and is not a duplicate
    return this.isEdited(originalPhrase) && !this.isMissingRequiredField() // && !this.isDuplicate(phrases);
  }

  canAutoFill() {
    return this.characters.length > 0 && (
      this.pinyin.length === 0 || this.english.length === 0
    );
  }

  // returns true when this phrase is registered in db
  isInDB(): boolean {
    return isSet(this._id);
  }

  toData(): PhraseInterface {
    return {
      characters: this.characters,
      pinyin: this.pinyin,
      pack: this.pack,
      progress: this.progress,
      english: this.english,
    }
  }

}

export const DefaultPhraseData: PhraseInterface = {
  characters: '',
  progress: 0,
  pinyin: '',
  english: '',
  pack: ''
}

// makeNewPhrase

export const makeNewPhrase = () => new Phrase(
  {
    ...DefaultPhraseData,
    owner_id: Mongodb.userID()
  }
);
