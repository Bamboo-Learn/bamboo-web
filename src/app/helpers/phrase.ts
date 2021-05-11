
import { BSON } from 'realm-web';

import { isSet } from './utils'

// Interfaces

interface PhraseInterface {
  owner_id: string
  characters: string
  pinyin: string
  english: string
  category: string
  confidence: number
  [propname: string]: any
}

interface DBPhraseInterface extends PhraseInterface {
  _id: BSON.ObjectID
  created_at: string
}

export type { PhraseInterface, DBPhraseInterface }

// Phrase Class

export class Phrase implements PhraseInterface, DBPhraseInterface {

  _id: BSON.ObjectID
  created_at: string
  owner_id: string
  characters: string
  pinyin: string
  category: string
  confidence: number
  english: string
  original: {
    characters: string;
    english: string;
    confidence: number;
    pinyin: string;
  }

  constructor(phrase: PhraseInterface | DBPhraseInterface) {
    this._id = phrase._id || null;
    this.created_at = phrase.created_at || null;
    this.owner_id = phrase.owner_id;
    this.characters = phrase.characters;
    this.pinyin = phrase.pinyin;
    this.category = phrase.category;
    this.confidence = phrase.confidence;
    this.english = phrase.english;
    this.original = this.makeOriginal();
  }

  makeOriginal() {
    return {
      characters: this.characters,
      english: this.english,
      confidence: this.confidence,
      pinyin: this.pinyin
    };
  }

  // sets the original to the current (does not save to db)
  save({ insertedId }: { insertedId: BSON.ObjectID }) {
    if (isSet(insertedId)) {
      // if this is newly inserted then add id
      this._id = insertedId;
    }
    this.original = this.makeOriginal();
  }

  // takes the original and sets the actual to that (erases changes)
  revert() {
    this.characters = this.original.characters;
    this.english = this.original.english;
    this.confidence = this.original.confidence;
    this.pinyin = this.original.pinyin;
  }

  // returns true if fields are blank
  isMissingRequiredField() {
    return !isSet(this.characters);
  }

  // returns true when this phrase has been edited
  isEdited() {
    return !this.original ||
      this.original.english !== this.english ||
      this.original.characters !== this.characters ||
      this.original.confidence !== this.confidence ||
      this.original.pinyin !== this.pinyin;
  }

  isDuplicate(phrases: Phrase[]) {
    let count = 0;
    phrases.forEach(phrase => {
      if (phrase.characters === this.characters) {
        count++
        if (count >= 2) return true;
      }
    });
    return count >= 2;
  }

  isSaveable(phrases: Phrase[]) {
    // it is saveable if it has been edited, is not missing fields, and is not a duplicate
    return this.isEdited() && !this.isMissingRequiredField() && !this.isDuplicate(phrases);
  }

  // returns true when this phrase is registered in db
  isInDB() {
    return isSet(this._id);
  }

  // changes the confidence
  cycleStatus() {
    switch (this.confidence) {
      case 0:
        this.confidence = 5;
        return;
      case 10:
        this.confidence = 0;
        return;
      default:
        this.confidence = 10;
        return;
    }
  }

  getStorable(user_id: string) {
    return {
      _id: this._id,
      characters: this.characters,
      pinyin: this.pinyin,
      confidence: this.confidence,
      english: this.english,
      owner_id: user_id, // necessary
      created_at: this.created_at || new Date()
    }
  }

  autofill(lookupChars: { character: string, english: string, pinyin: string }[], fields: { english: boolean, pinyin: boolean }) {
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
    if (fields.english) {
      this.english = english.trim();
    }
    if (fields.pinyin) {
      this.pinyin = pinyin.trim();
    }
    return this;
  }
}

// makeNewPhrase

export const makeNewPhrase = (userID: string) => new Phrase({
  owner_id: userID,
  confidence: 0,
  category: '',
  pinyin: '',
  english: '',
  characters: ''
});