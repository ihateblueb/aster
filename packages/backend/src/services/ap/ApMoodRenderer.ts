import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';
import ApVisibilityService from './ApVisibilityService.js';

class ApMoodRenderer {
	public async render(mood: ObjectLiteral): Promise<ApObject> {
		let apMood = {
			'@context': context,

			type: 'Mood',
			id: ConfigService.url.href + 'mood/' + mood.id,
			actor: ConfigService.url.href + 'users/' + mood.user.id,
			content: mood.content,

			published: mood.createdAt,
			endTime: mood.expiresAt,

			visibility: mood.visibility,
			to: [],
			cc: []
		};

		const { to, cc } = await ApVisibilityService.render(
			mood.user.id,
			apMood
		);

		apMood.to = to;
		apMood.cc = cc;

		return mood;
	}
}

export default new ApMoodRenderer();
