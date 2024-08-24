import { In, LessThan } from 'typeorm';

import db from '../../utils/database.js';
import logger from '../../utils/logger.js';

export default async function generateTimelineHome(user, take, since) {
	let collectedObjects = [];

	let grabbedUser = await db
		.getRepository('user')
		.findOne({ where: { id: user } });

	if (grabbedUser) {
		let grabbedFollowing = await db
			.getRepository('relationship')
			.find({ where: { from: user } });

		if (grabbedFollowing) {
			let grabbedNotes;
			let sortedFollowing = [];

			sortedFollowing.push(user);

			for (const i in grabbedFollowing) {
				sortedFollowing.push(grabbedFollowing[i].to);
			}

			if (since) {
				grabbedNotes = await db
					.getRepository('note')
					.createQueryBuilder()
					.where({
						author: In(sortedFollowing),
						created_at: LessThan(since)
					})
					.orderBy('created_at', 'DESC')
					.take(take)
					.getMany();
			} else {
				grabbedNotes = await db
					.getRepository('note')
					.createQueryBuilder()
					.where({
						author: In(sortedFollowing)
					})
					.orderBy('created_at', 'DESC')
					.take(take)
					.getMany();
			}

			if (grabbedNotes) {
				await grabbedNotes.forEach(async (e) => {
					collectedObjects.push({
						type: 'note',
						object: e
					});
				});
			}

			let grabbedRepeats;

			if (since) {
				grabbedRepeats = await db
					.getRepository('repeat')
					.createQueryBuilder()
					.where({
						author: In(sortedFollowing),
						created_at: LessThan(since)
					})
					.orderBy('created_at', 'DESC')
					.take(take)
					.getMany();
			} else {
				grabbedRepeats = await db
					.getRepository('repeat')
					.createQueryBuilder()
					.where({
						author: In(sortedFollowing)
					})
					.orderBy('created_at', 'DESC')
					.take(take)
					.getMany();
			}

			if (grabbedRepeats) {
				await grabbedRepeats.forEach(async (e) => {
					collectedObjects.push({
						type: 'repeat',
						object: e
					});
				});
			}

			collectedObjects.sort(
				(x, y) =>
					+new Date(y.object.created_at) -
					+new Date(x.object.created_at)
			);

			if (collectedObjects.length > take) {
				collectedObjects.length = take;
			}

			return collectedObjects;
		} else {
			logger.debug('timeline', 'no following found for user ' + user);
		}
	} else {
		logger.debug(
			'timeline',
			'failed to grab user when rendering their home timeline'
		);
	}
}
