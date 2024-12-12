class ApImageRenderer {
	public render(src: string, sensitive?: boolean, alt?: string) {
		const apImage = {
			type: 'Image',
			url: src,
			sensitive: sensitive,
			description: alt
		};

		return apImage;
	}
}

export default new ApImageRenderer();
