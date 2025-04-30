class ApDocumentRenderer {
	public render(
		url: string,
		type: string,
		alt: string,
		sensitive: boolean
	): ApObject {
		return {
			type: 'Document',
			url: url,
			mediaType: type,
			name: alt,
			sensitive: sensitive
		};
	}
}

export default new ApDocumentRenderer();
