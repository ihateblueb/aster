import express from 'express';

import db from '../../../utils/database.js';
import ApiNote from '../../../constructors/note.js';

const router = express.Router();

router.get('/api/v1/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var collectedNotes = [];
	var sortedReactions = [];

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public' })
		.getMany();

	new Promise((resolve, reject) => {
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
							sortedReactions.find(
								(e) => e.id === reaction.emoji.id
							)
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
					collectedNotes.push(
						new ApiNote(note, grabbedAuthor, sortedReactions)
					);
				} else {
					collectedNotes.push(new ApiNote(note, grabbedAuthor));
				}
			} else {
				res.status(500).json({
					status: 500,
					message: 'Missing author'
				});
			}

			if (i === a.length - 1) resolve(i);
		});
	}).then(() => {
		res.status(200).json(collectedNotes);
	});
});

export default router;
