class ApImageRenderer {
	public render(src: string, sensitive?: boolean, alt?: string) {
        // todo: is this correct at all
		let apImage = {
			type: 'Image',
            href: src,
            description: alt,
            sensitive: sensitive
		};

		return apImage;
	}
}

export default new ApImageRenderer();
