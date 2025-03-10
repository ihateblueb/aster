import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';

class ApRejectRenderer {
	public render(
		id: GenericId,
		actor: GenericId,
		activity: ApObject
	): ApObject {
		return {
			'@context': context,

			type: 'Reject',
			id: ConfigService.url.href + 'activities/' + id,
			actor: ConfigService.url.href + 'users/' + actor,
			object: activity
		};
	}
}

export default new ApRejectRenderer();
