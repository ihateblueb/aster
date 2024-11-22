import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApRejectRenderer {
	public render(id: string, activity: ObjectLiteral) {
		return {
			'@context': context,

			type: 'Reject',
			id: new URL(config.url).href + 'activities/' + id,
			object: activity
		};
	}
}

export default new ApRejectRenderer();
