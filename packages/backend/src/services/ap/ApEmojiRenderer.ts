import ApImageRenderer from './ApImageRenderer.js';

class ApEmojiRenderer {
	public render(id: string, name: string, url: string): ApObject {
		return {
			type: 'Emoji',
			id: id,
			name: name, // todo: :name:?
			icon: ApImageRenderer.render(url)
		};
	}
}

export default new ApEmojiRenderer();
