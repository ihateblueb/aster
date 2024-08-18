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

	type: string;

	actor: string;
	object: string;
	context: string;

	to?: string[];

	content?: string;
	_misskey_reaction?: string;

	tag?: object[];

	constructor(id, actor, author, note, reaction?) {
		this.id = config.get().url + 'activities/' + id;

		this.type = 'Like';

		this.actor = actor.ap_id;
		this.object = note.ap_id;
		this.context = note.ap_id;

		this.to = [actor.followers_url, author.ap_id];

		if (reaction) {
			this.content = reaction.emoji.name;

			this.tag = [new ApEmoji(reaction.emoji)];
		}
	}

	build() {
		return this;
	}
}
