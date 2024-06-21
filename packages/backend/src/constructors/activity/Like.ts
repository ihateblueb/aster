import { NoteReact } from '../../entities/NoteReact.js';
import config from '../../utils/config.js';
import ApEmoji from '../ApEmoji.js';

export default class ActLike {
	id: string;

	readonly type: 'Like';

	actor: string;
	object: string;

	content?: string;
	_misskey_reaction?: string;
	tag?: object[];

	constructor(reaction: NoteReact) {
		this.id = config.url + 'activities/' + reaction.id;
		this.actor = reaction.user.ap_id;
		this.object = reaction.note.author.ap_id;

		if (reaction.emoji) {
			this.content = reaction.emoji.name;

			this.tag = [new ApEmoji(reaction.emoji)];
		}
	}

	build() {
		return this;
	}
}
