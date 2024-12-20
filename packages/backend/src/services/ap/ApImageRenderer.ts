class ApImageRenderer {
	public render(src: string, sensitive?: boolean, alt?: string) {
		const apImage = {
			type: 'Image',
			url: src,
			sensitive: sensitive,
			name: alt, // todo: mastodon does this one, but i dont like it. see if it catches summary also so i can drop this
			summary: alt
		};

		return apImage;
	}
}

export default new ApImageRenderer();
