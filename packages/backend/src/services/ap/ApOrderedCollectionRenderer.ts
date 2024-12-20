import { ObjectLiteral } from 'typeorm';

import context from '../../static/context.js';
import config from '../../utils/config.js';

class ApOrderedCollectionRenderer {
	public render(
		first: boolean,
		base: string,
		cursor: string,
		items: ObjectLiteral[]
	): ApObject {
		let apOrderedCollection;

		if (first) {
			apOrderedCollection = {
				'@context': context,

				id: new URL(config.url).href + base,
				type: 'OrderedCollection',
				totalItems: items.length
			};

			if (items.length > 0)
				apOrderedCollection['first'] =
					new URL(config.url).href + base + '?page=true';
		} else {
			let orderedItems;

			// todo: once follows work
			// get index of cursor, if present
			// trim cursor and everything above,
			// trim everything under the last 10

			apOrderedCollection = {
				'@context': context,

				id:
					new URL(config.url).href +
					base +
					'?page=true' +
					(cursor ? '&cursor=' + cursor : ''),
				type: 'OrderedCollection',
				partOf: new URL(config.url).href + base,
				totalItems: items.length,

				orderedItems: orderedItems
			};

			if (items.length > 0)
				apOrderedCollection['next'] =
					new URL(config.url).href +
					base +
					'?page=true&cursor=' +
					apOrderedCollection.orderedItems.at(-1);
		}

		return apOrderedCollection;
	}
}

export default new ApOrderedCollectionRenderer();
