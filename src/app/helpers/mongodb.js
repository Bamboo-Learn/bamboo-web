
import {
	Stitch,
	RemoteMongoClient,
	UserPasswordAuthProviderClient,
	UserPasswordCredential,
	GoogleRedirectCredential
} from 'mongodb-stitch-browser-sdk';

export class Mongodb {
	constructor() {
		this.client = Stitch.initializeDefaultAppClient('bamboo-rwymp');
		this.db = this.client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('bamboo-db');
	}

	isLoggedIn() {
		if (this.client.auth.hasRedirectResult()) {
			this.client.auth.handleRedirectResult();
			return true;
		}
		return this.client.auth.isLoggedIn;
	}

	async loginWithEmailAndPassword({ email, password }) {
		const credential = new UserPasswordCredential(email, password);
		return await this.client.auth.loginWithCredential(credential);
	}

	async createAccountWithEmailAndPassword({ email, password }) {
		const emailPasswordClient = Stitch.defaultAppClient.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
		return await emailPasswordClient.registerWithEmail(email, password);
	}

	async sendPasswordResetEmail({ email }) {
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
		window.location = '/';
	}

	userID() {
		if (!this.client.auth.user) {
			return
		}
		return this.client.auth.user.id;
	}


	// TODO: handle errors in all of these (in case network is gone)
	async getCharacters(characters) {
		if (!this.isLoggedIn()) {
			return;
		}
		const collection = this.db.collection('characters');
		return await collection.find({ character: { $in: [...characters] } }).toArray();
	}

	async getPhrases({ perPage, page, orderBy, reverse }) {
		if (!this.isLoggedIn()) {
			return [];
		}
		const sort = `{ 
      "${ orderBy === '' ? '_id' : orderBy}" : 
      ${ reverse ? "-1" : "1"}
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

	async savePhrase(phrase) {
		if (!this.isLoggedIn()) {
			return;
		}
		const collection = this.db.collection('phrases');
		const storePhrase = phrase.getStorable(this.userID());

		if (!storePhrase._id) {
			return await collection.insertOne(storePhrase);
		}
		return await collection.updateOne({ _id: storePhrase._id }, storePhrase);
	}

	async removePhrase(phrase) {
		if (!this.isLoggedIn()) {
			return;
		}
		const collection = this.db.collection('phrases');
		return await collection.deleteOne({ _id: phrase._id });
	}
}