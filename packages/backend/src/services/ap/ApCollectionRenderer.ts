import context from '../../static/context.js';
import ConfigService from '../ConfigService.js';

// todo: pagination
class ApCollectionRenderer {
	public render(base: string, items: ApId[] | ApObject[]): ApObject {
		return {
			'@context': context,

			id: ConfigService.url.href + base,
			type: 'Collection',
			totalItems: items.length,
			items: items
		};
	}
}

export default new ApCollectionRenderer();
