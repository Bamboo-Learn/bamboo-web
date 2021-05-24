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
    this.progress = phrase.progress || phrase.confidence / 10 || 0;

    this.confidence = phrase.confidence;
    this.category = phrase.category;

    Object.preventExtensions(this);
    Object.freeze(this);
  }

  set(field: string, value: string | number): Phrase {
    return new Phrase({ ...this, [field]: value });
  }

  makeOriginal() {
    return {
      characters: this.characters,
      english: this.english,
      confidence: this.confidence,
      pinyin: this.pinyin
    };
  }

  // Immutable Functions

  // sets the original to the current (does not save to db)
  save({ insertedId }: { insertedId: BSON.ObjectID }): Phrase {
    return Object.create({ ...this, _id: insertedId });
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
    return Object.create({ ...this, confidence });
  }

  autofill(lookupChars: { character: string, english: string, pinyin: string }[], fields: { english: boolean, pinyin: boolean }): Phrase {
    let pinyin = '';
    let english = '';
    for (let i = 0; i < this.characters.length; i++) {
      const character = this.characters.charAt(i);
      const lookupChar = lookupChars.find(luc => luc.character === character);
      if (!lookupChar) {
        english += ' _ | ';
        pinyin += '_ ';
      } else {
        english += (i === this.characters.length - 1) ? lookupChar.english : lookupChar.english + ' | ';
        pinyin += lookupChar.pinyin[0] + ' ';
      }
    }
    const newFields: { english?: string, pinyin?: string } = {};
    if (fields.english) {
      newFields.english = english.trim();
    }
    if (fields.pinyin) {
      newFields.pinyin = pinyin.trim();
    }
    return Object.create({ ...this, ...newFields });
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

  isDuplicate(phrases: Phrase[]): boolean {
    let count = 0;
    phrases.forEach(phrase => {
      if (phrase.characters === this.characters) {
        count++
        if (count >= 2) return true;
      }
    });
    return count >= 2;
  }

  isSaveable(originalPhrase: Phrase, phrases: Phrase[]): boolean {
    // it is saveable if it has been edited, is not missing fields, and is not a duplicate
    return this.isEdited(originalPhrase) && !this.isMissingRequiredField() && !this.isDuplicate(phrases);
  }

  // returns true when this phrase is registered in db
  isInDB(): boolean {
    return isSet(this._id);
  }

  copy(): Phrase {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
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

  getStorable(): DBPhraseInterface {
    return {
      ...this.toData(),
      _id: this._id,
      owner_id: Mongodb.userID(),
      created_at: this.created_at || new Date()
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
