import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApAcceptRenderer {
	public render(activity) {
		return {
			'@context': context,

			type: 'Accept',
			id: new URL(config.url).href + 'activities/' + activity.id,
			object: activity.activity
		};
	}
}

export default new ApAcceptRenderer();
