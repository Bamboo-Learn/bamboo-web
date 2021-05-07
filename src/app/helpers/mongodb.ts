
import {
  Stitch,
  RemoteMongoClient,
  UserPasswordAuthProviderClient,
  UserPasswordCredential,
  GoogleRedirectCredential,
  StitchAppClient, RemoteMongoDatabase
} from 'mongodb-stitch-browser-sdk';
import { Phrase } from './phrase';

export class Mongodb {

  client: StitchAppClient
  db: RemoteMongoDatabase

  constructor() {
    this.client = Stitch.initializeDefaultAppClient('bamboo-rwymp');
    this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('bamboo-db');
  }

  isLoggedIn(): boolean {
    if (this.client.auth.hasRedirectResult()) {
      this.client.auth.handleRedirectResult();
      return true;
    }
    return this.client.auth.isLoggedIn;
  }

  async loginWithEmailAndPassword({ email, password }: { email: string, password: string }) {
    const credential = new UserPasswordCredential(email, password);
    return await this.client.auth.loginWithCredential(credential);
  }

  async createAccountWithEmailAndPassword({ email, password }: { email: string, password: string }) {
    const emailPasswordClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
    return await emailPasswordClient.registerWithEmail(email, password);
  }

  async sendPasswordResetEmail({ email }: { email: string }) {
    const emailPasswordClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
    return await emailPasswordClient.sendResetPasswordEmail(email);
  }

  loginWithGoogle() {
    // https://docs.mongodb.com/stitch/authentication/linking/
    const credential = new GoogleRedirectCredential();
    this.client.auth.loginWithRedirect(credential);
  }

  async logout() {
    await this.client.auth.logout();
    window.location.href = '/';
  }

  userID() {
    if (!this.client.auth.user) {
      return
    }
    return this.client.auth.user.id;
  }


  // TODO: handle errors in all of these (in case network is gone)
  async getCharacters(characters: string) {
    if (!this.isLoggedIn()) {
      return;
    }
    const collection = this.db.collection('characters');
    return await collection.find({ character: { $in: characters.split('') } }).toArray();
  }

  async getPhrases({ perPage, page, orderBy, order }: { perPage: number, page: number, orderBy: string, order: number }) {
    if (!this.isLoggedIn()) {
      return [];
    }
    const sort = `{ 
      "${orderBy === '' ? '_id' : orderBy}" : 
      ${order}
    }`;
    const collection = this.db.collection('phrases');
    const pipeline = [
      { '$match': { owner_id: this.userID() } },
      { '$sort': JSON.parse(sort) },
      { "$skip": page * perPage },
      { "$limit": perPage }
    ];
    return await collection.aggregate(pipeline).toArray();
  }

  async savePhrase(phrase: Phrase) {
    if (!this.isLoggedIn()) {
      return;
    }
    const collection = this.db.collection('phrases');
    const userID = this.userID();

    if (!userID) {
      return;
    }

    const storePhrase = phrase.getStorable(userID);

    if (!storePhrase._id) {
      return await collection.insertOne(storePhrase);
    }
    return await collection.updateOne({ _id: storePhrase._id }, storePhrase);
  }

  async removePhrase(phrase: Phrase) {
    if (!this.isLoggedIn()) {
      return;
    }
    const collection = this.db.collection('phrases');
    return await collection.deleteOne({ _id: phrase._id });
  }

  async loadUserData() {
    // return await Promise.all([
    // call to get the user data
    // call to get the pack data
    // call to get the total characters the user has
    // ])
    return await {
      displayCharacterSet: 'trad'
    }
  }
}