import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';

class ApAcceptRenderer {
	public render(
		id: GenericId,
		actor: GenericId,
		activity: ApObject | ApId
	): ApObject {
		return {
			'@context': context,

			'type': 'Accept',
			'id': ConfigService.url.href + 'activities/' + id,
			'actor': ConfigService.url.href + 'users/' + actor,
			'object': activity
		};
	}
}

export default new ApAcceptRenderer();
