import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApCreateRenderer {
	public render(note: ObjectLiteral) {
		return {
			'@context': context,

			type: 'Create',
			id: note.id + '/activity',
			actor: note.actor,
			object: note
		};
	}
}

export default new ApCreateRenderer();
