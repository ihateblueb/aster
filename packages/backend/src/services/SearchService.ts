import { Equal, ILike, LessThan, ObjectLiteral } from 'typeorm';

import db from '../utils/database.js';
import deduplicate from '../utils/deduplicate.js';
import logger from '../utils/logger.js';
import mergeObjects from '../utils/mergeObjects.js';
import ConfigService from './ConfigService.js';
import NoteRenderer from './NoteRenderer.js';
import NoteService from './NoteService.js';
import RelationshipService from './RelationshipService.js';
import TimelineService from './TimelineService.js';
import UserRenderer from './UserRenderer.js';
import UserService from './UserService.js';
import VisibilityService from './VisibilityService.js';
import WebfingerService from './WebfingerService.js';

class SearchService {
	private async lookup(query: string) {
		const splitHandle = query.split('@');

		let where = {
			username: Equal(splitHandle[1]),
			activated: true,
			suspended: false
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

	public async search(
		query: string,
		as: string,
		since?: string,
		take?: number
	) {
		let result = {
			redirect: false,
			results: []
		};

		if (!query || query.length < 0) return result;

		let queries: string[] = [];

		query = query.replaceAll('*', '%').replaceAll('%', '');
		queries = query.split(',');

		logger.debug('search', 'query: ' + query);

		async function addToResults(
			items: ObjectLiteral[],
			type: 'user' | 'note',
			redirect: boolean,
			check: 'blocking' | 'canISee'
		) {
			async function pushResult(item) {
				result.redirect = redirect;
				result.results.push({
					type: type,
					object:
						type === 'user'
							? await UserRenderer.render(item)
							: type === 'note'
								? await NoteRenderer.render(item)
								: item
				});
			}

			if (check === 'blocking') {
				for (const item of items) {
					if (
						!(await RelationshipService.eitherBlocking(
							item?.id,
							as
						))
					)
						await pushResult(item);
				}
			} else if (check === 'canISee') {
				for (const item of items) {
					if (await VisibilityService.canISee(item, as))
						await pushResult(item);
				}
			}
		}

		function Fuzzy(query: string) {
			return ILike(`%${query}%`);
		}

		take =
			take <= ConfigService.timeline.maxObjects && take > 0
				? take
				: ConfigService.timeline.maxObjects;

		let createdAt = undefined;
		if (since) createdAt = LessThan(since);

		function appendCreatedAt(object: object) {
			return createdAt
				? mergeObjects(object, {
						createdAt: createdAt
					})
				: object;
		}

		await this.lookup(query).then(async (e) => {
			if (e) await addToResults([e], 'user', true, 'blocking');
		});

		for (const query of queries) {
			await db
				.getRepository('user')
				.createQueryBuilder('user')
				.where(
					appendCreatedAt({
						id: query,
						activated: true,
						suspended: false
					})
				)
				.orWhere(
					appendCreatedAt({
						apId: query,
						activated: true,
						suspended: false
					})
				)
				.take(take)
				.orderBy('user.createdAt', 'DESC')
				.getMany()
				.then(async (e) => {
					await addToResults(e, 'user', true, 'blocking');
				});

			await db
				.getRepository('user')
				.createQueryBuilder('user')
				.orWhere(
					appendCreatedAt({
						username: Fuzzy(query),
						activated: true,
						suspended: false
					})
				)
				.orWhere(
					appendCreatedAt({
						displayName: Fuzzy(query),
						activated: true,
						suspended: false
					})
				)
				.take(take)
				.orderBy('user.createdAt', 'DESC')
				.getMany()
				.then(async (e) => {
					await addToResults(e, 'user', false, 'blocking');
				});

			await NoteService.createQueryBuilder()
				.where(
					appendCreatedAt({
						id: query,
						user: {
							activated: true,
							suspended: false
						}
					})
				)
				.orWhere(
					appendCreatedAt({
						apId: query,
						user: {
							activated: true,
							suspended: false
						}
					})
				)
				.take(take)
				.orderBy('note.createdAt', 'DESC')
				.getMany()
				.then(async (e) => {
					await addToResults(e, 'note', true, 'canISee');
				});

			await NoteService.createQueryBuilder()
				.where(
					appendCreatedAt({
						content: Fuzzy(query),
						user: {
							activated: true,
							suspended: false
						}
					})
				)
				.take(take)
				.orderBy('note.createdAt', 'DESC')
				.getMany()
				.then(async (e) => {
					await addToResults(e, 'note', false, 'canISee');
				});
		}

		// todo: text search

		result.results = deduplicate(result.results, ['object', 'id']);
		result.results = TimelineService.sort(result.results, take);

		return result;
	}
}

export default new SearchService();
