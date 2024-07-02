import { NoteReact } from '../../entities/NoteReact.js';
import { User } from '../../entities/User.js';
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

	constructor(reaction: NoteReact, user: User, author: User) {
		this.id = config.url + 'activities/' + reaction.id;
		this.actor = user.ap_id;
		this.object = author.ap_id;

		if (reaction.emoji) {
			this.content = reaction.emoji.name;

			this.tag = [new ApEmoji(reaction.emoji)];
		}
	}

	build() {
		return this;
	}
}
