import express from 'express';

import db from '../../../utils/database.js';
import ApiNote from '../../../constructors/note.js';
import config from '../../../utils/config.js';
import logger from '../../../utils/logger.js';

const router = express.Router();

async function renderTimeline(grabbedNotes) {
	var collectedNotes = [];
	var sortedReactions = [];

	console.log('!!!!!! grabbedNotes.length !!!!!! ' + grabbedNotes.length);

	grabbedNotes.forEach(async (note, i, a) => {
		var grabbedAuthor = await db
			.getRepository('user')
			.createQueryBuilder()
			.where({ id: note.author })
			.getOne();

		if (grabbedAuthor) {
			var grabbedReactions = await db
				.getRepository('note_react')
				.createQueryBuilder('note_react')
				.leftJoinAndSelect('note_react.emoji', 'emoji')
				.where('note_react.note = :note', {
					note: note.id
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
				console.log('[tl] rendered note ' + (i + 1) + '/' + a.length);
				collectedNotes.push(
					new ApiNote(note, grabbedAuthor, sortedReactions)
				);
			} else {
				console.log('[tl] rendered note ' + (i + 1) + '/' + a.length);
				collectedNotes.push(new ApiNote(note, grabbedAuthor));
			}
		}
	});

	console.log(
		'!!!!!! collectedNotes.length (unsorted) !!!!!! ' +
			collectedNotes.length
	);

	collectedNotes.sort(
		(x, y) => +new Date(y.created_at) - +new Date(x.created_at)
	);

	console.log(
		'!!!!!! collectedNotes.length (sorted) !!!!!! ' + collectedNotes.length
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
