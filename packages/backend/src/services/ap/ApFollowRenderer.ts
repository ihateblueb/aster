import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApFollowRenderer {
	public render(id: GenericId, actor: GenericId, object: ApId): ApObject {
		return {
			'@context': context,

			type: 'Follow',
			id: new URL(config.url).href + 'activities/' + id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: object
		};
	}
}

export default new ApFollowRenderer();
