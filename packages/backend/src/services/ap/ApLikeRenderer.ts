import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApLikeRenderer {
	public render(id: ApId, actor: GenericId, object: GenericId): ApObject {
		return {
			'@context': context,

			type: 'Like',
			id: id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: object
		};
	}
}

export default new ApLikeRenderer();
