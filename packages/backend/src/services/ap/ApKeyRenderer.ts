class ApKeyRenderer {
	public render(actor: ApId, publicKey: string): ApObject {
		return {
			id: actor + '#main-key',
			type: 'Key',
			owner: actor,
			publicKeyPem: publicKey
		};
	}
}

export default new ApKeyRenderer();
