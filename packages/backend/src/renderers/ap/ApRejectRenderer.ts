import ConfigService from '../../services/ConfigService.js';
import context from '../../static/context.js';

class ApRejectRenderer {
	public render(
		id: GenericId,
		actor: GenericId,
		activity: ApObject | ApId
	): ApObject {
		return {
			'@context': context,

			'type': 'Reject',
			'id': ConfigService.url.href + 'activities/' + id,
			'actor': ConfigService.url.href + 'users/' + actor,
			'object': activity
		};
	}
}

export default new ApRejectRenderer();
