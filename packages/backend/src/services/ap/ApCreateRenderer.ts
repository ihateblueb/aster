import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApCreateRenderer {
	public render(id: GenericId, actor: GenericId, note: ObjectLiteral) {
		return {
			'@context': context,

			type: 'Create',
			id: new URL(config.url).href + 'activities/' + id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: note
		};
	}
}

export default new ApCreateRenderer();
