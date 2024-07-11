export default class ApActorPublicKey {
	id: string;
	type: string = 'Key';
	owner: string;
	publicKeyPem: string;

	constructor(id, owner, publicKeyPem) {
		this.id = id;
		this.owner = owner;
		this.publicKeyPem = publicKeyPem;
	}

	build() {
		return this;
	}
}
