import { ObjectLiteral } from 'typeorm';

import NoteService from './NoteService.js';
import RelationshipService from './RelationshipService.js';
import UserService from './UserService.js';
import VisibilityService from './VisibilityService.js';

class SearchService {
	private async lookup(query: string) {
		const splitHandle = query.split('@');

		let where = {
			username: splitHandle[1]
		};

		if (splitHandle[2]) where['host'] = splitHandle[2];
		if (!splitHandle[2]) where['local'] = true;

		return await UserService.get(where);
	}

	public async search(query: string, as: string) {
		let result = {
			redirect: false,
			results: []
		};

		console.log(query);

		async function addToResults(
			items: ObjectLiteral[],
			check: 'blocking' | 'canISee'
		) {
			if (check === 'blocking') {
				for (const item of items) {
					if (
						!(await RelationshipService.eitherBlocking(
							item?.id,
							as
						))
					) {
						result.redirect = true;
						result.results.push(item);
					}
				}
			} else if (check === 'canISee') {
				for (const item of items) {
					if (await VisibilityService.canISee(item, as)) {
						result.redirect = true;
						result.results.push(item);
					}
				}
			}
		}

		await this.lookup(query).then(async (e) => {});

		await UserService.getMany({ id: query }).then(async (e) => {
			await addToResults(e, 'blocking');
		});
		await UserService.getMany({ apId: query }).then(async (e) => {
			await addToResults(e, 'blocking');
		});

		await NoteService.getMany({ id: query }).then(async (e) => {
			await addToResults(e, 'canISee');
		});
		await NoteService.getMany({ apId: query }).then(async (e) => {
			await addToResults(e, 'canISee');
		});

		// todo: text search

		console.log(result);

		return result;
	}
}

export default new SearchService();
