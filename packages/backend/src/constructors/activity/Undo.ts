import config from '../../utils/config.js';
import contexts from '../../../static/contexts.json' with { type: 'json' };

export default class ActUndo {
	'@context': object = [
		'https://www.w3.org/ns/activitystreams',
		'https://w3id.org/security/v1',
		contexts
	];

	id: string;

	type: string;

	actor: string;
	object: object;

	published: string;

	constructor(activity) {
		this.id = activity.id + '/undo';
		this.type = 'Undo';
		this.actor = activity.actor;
		this.object = activity;
		this.published = new Date(Date.now()).toISOString();
	}

	build() {
		return this;
	}
}
