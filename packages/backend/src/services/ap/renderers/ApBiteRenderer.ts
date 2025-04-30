import context from '../../../static/context.js';
import ConfigService from '../../ConfigService.js';
import IdService from '../../IdService.js';

class ApBiteRenderer {
	public render(actor: GenericId, object: ApId): ApObject {
		const id = IdService.generate();

		return {
			'@context': context,

			'type': 'Bite',
			'id': ConfigService.url.href + 'activities/' + id,
			'actor': ConfigService.url.href + 'users/' + actor,
			'published': new Date().toISOString(),
			'target': object
		};
	}
}

export default new ApBiteRenderer();
