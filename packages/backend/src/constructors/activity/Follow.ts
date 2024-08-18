import config from '../../utils/config.js';
import contexts from '../../../static/contexts.json' with { type: 'json' };

export default class ActFollow {
	'@context': object = [
		'https://www.w3.org/ns/activitystreams',
		'https://w3id.org/security/v1',
		contexts
	];

	id: string;

	type: string = 'Follow';

	actor: string;
	object: object;

	constructor(activity) {
		this.id = config.get().url + 'activities/' + activity.id;
		this.actor = activity.actor.ap_id;
		this.object = activity.object;
	}

	build() {
		return this;
	}
}
