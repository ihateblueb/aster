import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApRejectRenderer {
	public render(id: GenericId, actor: GenericId, activity: ApObject): ApObject {
		return {
			'@context': context,

			type: 'Reject',
			id: new URL(config.url).href + 'activities/' + id,
			actor: new URL(config.url).href + 'users/' + actor,
			object: activity
		};
	}
}

export default new ApRejectRenderer();
