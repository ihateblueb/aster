import config from '../../utils/config.js';

export default class ActCreate {
	id: string;

	readonly type: 'Create';

	actor: string;
	object: object;
	published: string;
	to: string[];
	cc: string[];

	constructor(activity) {
		this.id = config.url + 'activities/' + activity.id;
		this.actor = activity.actor;
		this.object = activity;
		this.to = activity.to;
		this.cc = activity.cc;
	}

	build() {
		return this;
	}
}
