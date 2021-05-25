
import * as Realm from 'realm-web';

import { Phrase } from './phrase';

// https://docs.mongodb.com/realm/web/

export class Mongodb {

  static RealmAppID: string = 'bamboo-rwymp';
  static ClientName: string = 'mongodb-atlas';
  static DBName: string = 'bamboo-db';

  // Init

  static init(): Realm.App {
    return new Realm.App({ id: Mongodb.RealmAppID });
  }

  // Info

  static userID() {
    if (!Mongodb.isLoggedIn()) {
      return;
    }
    return Mongodb.getUser().id;
  }

  static isLoggedIn(): boolean {
    //   if (this.client.auth.hasRedirectResult()) {
    //     this.client.auth.handleRedirectResult();
    //     return true;
    //   }
    //   return this.client.auth.isLoggedIn;
    const user = Mongodb.getUser();
    return !!user && user.isLoggedIn;
  }

  // Authentication

  static async createAccountWithEmailAndPassword({ email, password }: { email: string, password: string }) {
    const app = Mongodb.getApp();
    return await app.emailPasswordAuth.registerUser(email, password);
  }

  static async confirmNewAccount() {
    // TODO: get the token and stuff 
  }

  static async loginWithEmailAndPassword({ email, password }: { email: string, password: string }) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const app = Mongodb.getApp();
    return await app.logIn(credentials);
  }

  static async sendPasswordResetEmail({ email }: { email: string }) {
    const app = Mongodb.getApp();
    return await app.emailPasswordAuth.sendResetPasswordEmail(email);
  }

  static async resetPassword({ password, token, tokenId }: { password: string, token: string, tokenId: string }) {
    const app = Mongodb.getApp();
    return await app.emailPasswordAuth.resetPassword(password, token, tokenId);
  }

  static async logout() {
    const user = Mongodb.getUser();
    await user.logOut();
    window.location.href = '/'; // redirect to home page after logout
  }

  // loginWithGoogle() {
  //   // https://docs.mongodb.com/stitch/authentication/linking/
  //   const credential = new GoogleRedirectCredential();
  //   this.client.auth.loginWithRedirect(credential);
  // }

  // Data

  // TODO: handle errors in all of these (in case network is gone)
  static async getCharacters(characters: string) {
    if (!Mongodb.isLoggedIn()) {
      return;
    }
    const db = Mongodb.getDB();
    const collection = db.collection('characters');
    return await collection.find({ character: { $in: characters.split('') } });
  }

  static async getPhrases({ perPage, page, orderBy: filterOrderBy, order }: { perPage: number, page: number, orderBy: string, order: number }) {
    if (!Mongodb.isLoggedIn()) {
      return [];
    }
    const db = Mongodb.getDB();
    const orderBy = filterOrderBy === '' ? '_id' : filterOrderBy;
    const collection = db.collection('phrases');
    const pipeline = [
      { '$match': { owner_id: Mongodb.userID() } },
      {
        '$sort': {
          [orderBy]: order
        }
      },
      { "$skip": page * perPage },
      { "$limit": perPage }
    ];
    return await collection.aggregate(pipeline);
  }

  static async savePhrase(phrase: Phrase) {
    if (!Mongodb.isLoggedIn()) {
      return;
    }
    const db = Mongodb.getDB();
    const collection = db.collection('phrases');
    const userID = Mongodb.userID();

    if (!userID) {
      return;
    }

    const storePhrase = phrase.makeStorable();
    if (!storePhrase.isInDB()) {
      return await collection.insertOne(storePhrase);
    }
    return await collection.updateOne({ _id: storePhrase._id }, storePhrase);
  }

  static async removePhrase(phrase: Phrase) {
    if (!Mongodb.isLoggedIn()) {
      return;
    }
    const db = Mongodb.getDB();
    const collection = db.collection('phrases');
    return await collection.deleteOne({ _id: phrase._id });
  }

  static async loadUserData() {
    // Use graphql here
    // return await Promise.all([
    // call to get the user data
    // call to get the pack data
    // call to get the total characters the user has
    // ])
    return await {
      displayCharacterSet: 'trad'
    }
  }


  // Private Functions

  private static getApp(): Realm.App {
    return Realm.App.getApp(Mongodb.RealmAppID);
  }

  private static getUser(): any {
    const app = Mongodb.getApp();
    return app.currentUser;
  }

  private static getDB() {
    const client = Mongodb.getUser().mongoClient(Mongodb.ClientName);
    return client.db(Mongodb.DBName)
  }

}