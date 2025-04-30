import context from '../../../static/context.js';
import ConfigService from '../../ConfigService.js';

// todo: pagination
class ApOrderedCollectionRenderer {
	public render(base: string, items: ApId[] | ApObject[]): ApObject {
		return {
			'@context': context,

			'id': ConfigService.url.href + base,
			'type': 'OrderedCollection',
			'totalItems': items.length,
			'items': items
		};
	}
}

export default new ApOrderedCollectionRenderer();
