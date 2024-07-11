import config from '../../utils/config.js';
import contexts from '../../../static/contexts.json' with { type: 'json' };

export default class ActCreate {
	'@context': object = [
		'https://www.w3.org/ns/activitystreams',
		'https://w3id.org/security/v1',
		contexts
	];

	id: string;

	readonly type: 'Create';

	actor: string;
	object: object;
	published: string;

	to: string[];
	cc: string[];

	constructor(activity) {
		this.id = config.url + 'activities/' + activity.id;
		this.actor = activity.actor.ap_id;
		this.object = activity.object;
		this.published = new Date(Date.now()).toISOString();
		this.to = activity.to;
		this.cc = activity.cc;
	}

	build() {
		return this;
	}
}
