import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApAnnounceRenderer {
	public async render(
		id: GenericId,
		actor: GenericId,
		visibility: string,
		activity: ObjectLiteral
	): Promise<ApObject> {
		const announce = {
			'@context': context,

			type: 'Announce',
			id: new URL(config.url).href + 'activities/' + id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: activity,
			published: new Date().toISOString(),

			visibility: visibility
		};

		const tocc = await ApVisibilityService.render(actor, announce);

		announce['to'] = tocc.to;
		announce['cc'] = tocc.cc;

		return announce;
	}
}

export default new ApAnnounceRenderer();
