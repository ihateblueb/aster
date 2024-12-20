import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApCreateRenderer {
	public render(id: GenericId, actor: GenericId, object: ApObject): ApObject {
		return {
			'@context': context,

			type: 'Delete',
			id: new URL(config.url).href + 'activities/' + id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: object
		};
	}
}

export default new ApCreateRenderer();
