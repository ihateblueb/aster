import express from 'express';

import db from '../../../utils/database.js';
import ApiNote from '../../../constructors/note.js';
import logger from '../../../utils/logger.js';
import { In } from 'typeorm';

const router = express.Router();

async function renderTimeline(grabbedNotes) {
	var collectedNotes = [];
	var sortedReactions = [];

	for (const i of grabbedNotes.keys()) {
		var grabbedAuthor = await db
			.getRepository('user')
			.createQueryBuilder()
			.where({ id: grabbedNotes[i].author })
			.getOne();

		if (grabbedAuthor) {
			var grabbedInstance = await db
				.getRepository('instance')
				.createQueryBuilder()
				.where({ host: grabbedAuthor.host })
				.getOne();

			let grabbedAttachments = await db
				.getRepository('drive_file')
				.createQueryBuilder()
				.where({
					note: grabbedNotes[i].id
				})
				.getMany();

			let grabbedEmojis = [];

			if (grabbedNotes[i].emojis) {
				grabbedNotes[i].emojis.forEach(async (emoji) => {
					let grabbedEmoji = await db
						.getRepository('emoji')
						.createQueryBuilder()
						.where({
							id: emoji
						})
						.getOne();

					grabbedEmojis.push(grabbedEmoji);
				});
			}

			var grabbedReactions = await db
				.getRepository('note_react')
				.createQueryBuilder('note_react')
				.leftJoinAndSelect('note_react.emoji', 'emoji')
				.where('note_react.note = :note', {
					note: grabbedNotes[i].id
				})
				.getMany();

			var grabbedLikes = await db.getRepository('note_like').find({
				where: {
					note: grabbedNotes[i].id
				}
			});

			collectedNotes.push(
				new ApiNote(
					grabbedNotes[i],
					grabbedAuthor,
					grabbedInstance,
					grabbedAttachments,
					grabbedEmojis,
					grabbedReactions,
					grabbedLikes
				)
			);
			logger(
				'debug',
				'timeline',
				'rendered note ' + (i + 1) + '/' + grabbedNotes.length
			);
		}
	}

	collectedNotes.sort(
		(x, y) => +new Date(y.created_at) - +new Date(x.created_at)
	);

	return collectedNotes;
}

router.get('/api/v2/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public' })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

router.get('/api/v2/timeline/local', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public', local: true })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

router.get('/api/v2/timeline/tag/:tag', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		// uuuuughh this query is gonna be fucked
		.where({ visibility: 'public' })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

export default router;
