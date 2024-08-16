import { LessThan } from 'typeorm';

import db from '../../utils/database.js';

export default async function generateTimelineLocal(take, since) {
	let collectedObjects = [];

	let grabbedNotes;

	if (since) {
		grabbedNotes = await db
			.getRepository('note')
			.createQueryBuilder()
			.where({
				local: true,
				visibility: 'public',
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
				local: true,
				visibility: 'public'
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
				local: true,
				visibility: 'public',
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
				local: true,
				visibility: 'public'
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
			+new Date(y.object.created_at) - +new Date(x.object.created_at)
	);

	if (collectedObjects.length > take) {
		collectedObjects.length = take;
	}

	return collectedObjects;
}
