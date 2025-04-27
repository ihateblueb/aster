import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';

class ApLikeRenderer {
	public render(id: ApId, actor: GenericId, object: ApId): ApObject {
		return {
			'@context': context,

			'type': 'Like',
			'id': id,
			'actor': ConfigService.url.href + 'users/' + actor,
			'object': object
		};
	}
}

export default new ApLikeRenderer();
