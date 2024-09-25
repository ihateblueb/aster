import { LessThan } from 'typeorm';

import db from '../../utils/database.js';

export default async function generateNotificationsAll(to, take, since) {
	let collectedObjects = [];

	let grabbedNotifications;

	if (since) {
		grabbedNotifications = await db
			.getRepository('notification')
			.createQueryBuilder()
			.where({
				to: to,
				type: 'mention',
				created_at: LessThan(since)
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	} else {
		grabbedNotifications = await db
			.getRepository('notification')
			.createQueryBuilder()
			.where({
				to: to,
				type: 'mention'
			})
			.orderBy('created_at', 'DESC')
			.take(take)
			.getMany();
	}

	if (grabbedNotifications) {
		await grabbedNotifications.forEach(async (e) => {
			collectedObjects.push({
				type: 'notification',
				object: e
			});
		});
	}

	collectedObjects.sort(
		(x, y) =>
			+new Date(y.object.created_at) - +new Date(x.object.created_at)
	);

	if (collectedObjects.length > take) {
		collectedObjects.length = take;
	}

	return collectedObjects;
}
