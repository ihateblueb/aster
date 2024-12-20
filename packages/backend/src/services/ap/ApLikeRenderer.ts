import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApLikeRenderer {
	public render(id: GenericId, actor: GenericId, object: GenericId) {
		return {
			'@context': context,

			type: 'Like',
			id: new URL(config.url).href + 'activities/' + id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: object
		};
	}
}

export default new ApLikeRenderer();
