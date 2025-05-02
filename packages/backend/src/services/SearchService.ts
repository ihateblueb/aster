import { ILike, ObjectLiteral } from 'typeorm';

import deduplicate from '../utils/deduplicate.js';
import logger from '../utils/logger.js';
import NoteService from './NoteService.js';
import RelationshipService from './RelationshipService.js';
import UserService from './UserService.js';
import VisibilityService from './VisibilityService.js';
import WebfingerService from './WebfingerService.js';

class SearchService {
	private async lookup(query: string) {
		const splitHandle = query.split('@');

		let where = {
			username: splitHandle[1]
		};

		if (splitHandle[2]) where['host'] = splitHandle[2];
		if (!splitHandle[2]) where['local'] = true;

		const existingUser = await UserService.get(where);

		if (existingUser) return existingUser;
		if (splitHandle[2])
			return await WebfingerService.lookup(
				`@${splitHandle[1]}@${splitHandle[2]}`
			);

		return false;
	}

	public async search(query: string, as: string) {
		let result = {
			redirect: false,
			results: []
		};

		if (!query || query.length < 0) return result;

		logger.debug('search', 'query: ' + query);

		async function addToResults(
			items: ObjectLiteral[],
			type: 'user' | 'note',
			redirect: boolean,
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
						result.redirect = redirect;
						result.results.push({
							type: type,
							object: item
						});
					}
				}
			} else if (check === 'canISee') {
				for (const item of items) {
					if (await VisibilityService.canISee(item, as)) {
						result.redirect = redirect;
						result.results.push({
							type: type,
							object: item
						});
					}
				}
			}
		}

		await this.lookup(query).then(async (e) => {
			if (e) await addToResults([e], 'user', true, 'blocking');
		});

		await UserService.getMany({ id: query }).then(async (e) => {
			await addToResults(e, 'user', true, 'blocking');
		});
		await UserService.getMany({ apId: query }).then(async (e) => {
			await addToResults(e, 'user', true, 'blocking');
		});
		await UserService.getMany({ username: ILike(query) }).then(
			async (e) => {
				await addToResults(e, 'user', false, 'blocking');
			}
		);
		await UserService.getMany({ displayName: ILike(query) }).then(
			async (e) => {
				await addToResults(e, 'user', false, 'blocking');
			}
		);

		await NoteService.getMany({ id: query }).then(async (e) => {
			await addToResults(e, 'note', true, 'canISee');
		});
		await NoteService.getMany({ apId: query }).then(async (e) => {
			await addToResults(e, 'note', true, 'canISee');
		});

		// todo: text search

		result.results = deduplicate(result.results, ['object', 'id']);

		return result;
	}
}

export default new SearchService();
