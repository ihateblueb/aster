import { Emoji } from '../entities/Emoji.js';

export default class ApEmoji {
	id: string;

	readonly type: 'Emoji';

	name: string;
	updated: string;

	icon: {
		type: 'Image';
		mediaType: string;
		url: string;
	};

	constructor(grabbedEmoji: Emoji) {
		this.id = grabbedEmoji.ap_id;
		this.name = grabbedEmoji.name;
		this.updated = grabbedEmoji.updated_at;

		this.icon.mediaType = grabbedEmoji.type;
		this.icon.url = grabbedEmoji.url;
	}

	build() {
		return this;
	}
}
