import config from '../../utils/config.js';
import contexts from '../../../static/contexts.json' with { type: 'json' };

export default class ActAnnounce {
	'@context': object = [
		'https://www.w3.org/ns/activitystreams',
		'https://w3id.org/security/v1',
		contexts
	];

	id: string;

	type: string = 'Announce';

	actor: string;
	object: object;
	published: string;

	visibility: string;

	to: string[];
	cc: string[];

	constructor(activity) {
		this.id = config.get().url + 'activities/' + activity.id;
		this.actor = activity.actor.ap_id;
		this.object = activity.object;
		this.published = new Date(Date.now()).toISOString();

		if (activity.visibility === 'public') {
			this.visibility = 'public';

			this.to = ['https://www.w3.org/ns/activitystreams#Public'];
		} else if (activity.visibility === 'unlisted') {
			this.visibility = 'unlisted';

			this.to = [activity.actor.followers_url];
			this.cc = ['https://www.w3.org/ns/activitystreams#Public'];
		} else if (activity.visibility === 'followers') {
			this.visibility = 'followers';

			this.to = [activity.actor.followers_url];
		} else if (activity.visibility === 'direct') {
			this.visibility = 'direct';

			// this needs to be figured out later
			//this.to = []
			//this.cc = []
		}
	}

	build() {
		return this;
	}
}
