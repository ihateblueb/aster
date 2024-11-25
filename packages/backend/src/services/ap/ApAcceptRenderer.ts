import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApAcceptRenderer {
	public render(id: string, actor: string, activity: ObjectLiteral) {
		return {
			'@context': context,

			type: 'Accept',
			id: new URL(config.url).href + 'activities/' + id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: activity
		};
	}
}

export default new ApAcceptRenderer();
