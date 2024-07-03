export default class ApActorPublicKey {
	id: string;
	readonly type: 'Key';
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
