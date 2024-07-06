import express from 'express';

import db from '../../../utils/database.js';
import ApiNote from '../../../constructors/note.js';
import logger from '../../../utils/logger.js';

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

			if (grabbedReactions) {
				grabbedReactions.forEach(async (reaction) => {
					if (
						sortedReactions.find((e) => e.id === reaction.emoji.id)
					) {
						sortedReactions.find(
							(e) => e.id === reaction.emoji.id
						).count += 1;
						sortedReactions
							.find((e) => e.id === reaction.emoji.id)
							.from.push(reaction.user);
					} else {
						sortedReactions.push({
							id: reaction.emoji.id,
							url: reaction.emoji.url,
							name: reaction.emoji.name,
							host: reaction.emoji.host,
							local: reaction.emoji.local,
							count: 1,
							from: [reaction.user]
						});
					}
				});
				logger(
					'debug',
					'timeline',
					'rendered note ' + (i + 1) + '/' + grabbedNotes.length
				);
				collectedNotes.push(
					new ApiNote(
						grabbedNotes[i],
						grabbedAuthor,
						grabbedAttachments,
						grabbedEmojis,
						sortedReactions
					)
				);
			} else {
				logger(
					'debug',
					'timeline',
					'rendered note ' + (i + 1) + '/' + grabbedNotes.length
				);
				collectedNotes.push(
					new ApiNote(grabbedNotes[i], grabbedAuthor)
				);
			}
		}
	}

	collectedNotes.sort(
		(x, y) => +new Date(y.created_at) - +new Date(x.created_at)
	);

	return collectedNotes;
}

router.get('/api/v1/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public' })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

router.get('/api/v1/timeline/local', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ local: true, visibility: 'public' })
		.getMany();

	res.status(200).json(await renderTimeline(grabbedNotes));
});

export default router;
