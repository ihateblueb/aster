import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApAnnounceRenderer {
	public async render(
		note: ObjectLiteral,
		activity: ObjectLiteral | string
	): Promise<ApObject> {
		let announce = {
			'@context': context,

			type: 'Announce',
			id: note.apId + '/activity',
			actor: note.user.apId,
			object: activity,
			published: new Date().toISOString(),

			visibility: note.visibility
		};

		const tocc = await ApVisibilityService.render(note.user, announce);

		announce['to'] = tocc.to;
		announce['cc'] = tocc.cc;

		return announce;
	}
}

export default new ApAnnounceRenderer();
