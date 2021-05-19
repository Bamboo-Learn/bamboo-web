import { BSON } from 'realm-web';

import { Mongodb } from './mongodb';
import { isSet } from './utils'

// Interface

export interface PhraseInterface {
  characters: string
  pinyin: string
  english: string
  category: string
  confidence: number
  owner_id: string
  [propname: string]: any
}

export interface DBPhraseInterface extends PhraseInterface {
  _id: BSON.ObjectID
  created_at: Date
}

// Phrase Class

export class Phrase implements PhraseInterface, DBPhraseInterface {

  _id: BSON.ObjectID
  created_at: Date
  owner_id: string
  characters: string
  pinyin: string
  category: string
  confidence: number
  english: string

  constructor(phrase: PhraseInterface | DBPhraseInterface) {
    this._id = phrase._id || undefined;
    this.created_at = phrase.created_at || undefined;
    this.owner_id = phrase.owner_id;
    this.characters = phrase.characters;
    this.pinyin = phrase.pinyin;
    this.category = phrase.category;
    this.confidence = phrase.confidence;
    this.english = phrase.english;
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
  isEdited(phrases: Phrase[]): boolean {
    return this.getOriginal(phrases) !== this;
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

  isSaveable(phrases: Phrase[]): boolean {
    // it is saveable if it has been edited, is not missing fields, and is not a duplicate
    return this.isEdited(phrases) && !this.isMissingRequiredField() && !this.isDuplicate(phrases);
  }

  // returns true when this phrase is registered in db
  isInDB(): boolean {
    return isSet(this._id);
  }

  getStorable(user_id: string): DBPhraseInterface {
    return {
      _id: this._id,
      characters: this.characters,
      pinyin: this.pinyin,
      category: this.category, // TODO: remove this
      confidence: this.confidence,
      english: this.english,
      owner_id: user_id, // necessary
      created_at: this.created_at || new Date()
    }
  }
}

// makeNewPhrase

export const makeNewPhrase = () => new Phrase({
  owner_id: Mongodb.userID(),
  confidence: 0,
  category: '',
  pinyin: '',
  english: '',
  characters: ''
});