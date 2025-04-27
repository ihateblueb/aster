import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';

class ApFollowRenderer {
	public render(id: GenericId, actor: GenericId, object: ApId): ApObject {
		return {
			'@context': context,

			'type': 'Follow',
			'id': ConfigService.url.href + 'activities/' + id,
			'actor': ConfigService.url.href + 'users/' + actor,
			'object': object
		};
	}
}

export default new ApFollowRenderer();
