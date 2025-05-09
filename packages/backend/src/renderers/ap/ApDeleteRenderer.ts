import ConfigService from '../../services/ConfigService.js';
import context from '../../static/context.js';

class ApDeleteRenderer {
	public render(id: GenericId, actor: GenericId, object: ApObject): ApObject {
		return {
			'@context': context,

			'type': 'Delete',
			'id': ConfigService.url.href + 'activities/' + id,
			'actor': ConfigService.url.href + 'users/' + actor,
			'object': object
		};
	}
}

export default new ApDeleteRenderer();
