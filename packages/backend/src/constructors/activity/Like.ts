import { NoteReact } from '../../entities/NoteReact.js';
import { User } from '../../entities/User.js';
import config from '../../utils/config.js';
import ApEmoji from '../ApEmoji.js';
import contexts from '../../../static/contexts.json' with { type: 'json' };

export default class ActLike {
	'@context': object = [
		'https://www.w3.org/ns/activitystreams',
		'https://w3id.org/security/v1',
		contexts
	];

	id: string;

	readonly type: 'Like';

	actor: string;
	object: string;

	content?: string;
	_misskey_reaction?: string;
	tag?: object[];

	// TODO: reaction? uuhg

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
