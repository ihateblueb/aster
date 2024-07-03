import express from 'express';

import db from '../../../utils/database.js';

const router = express.Router();

router.get('/api/v1/timeline/public', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var grabbedNotes = await db
		.getRepository('note')
		.createQueryBuilder()
		.where({ visibility: 'public' })
		.getMany();

	grabbedNotes.forEach(async (note, i) => {
		let grabbedAuthor = await db
			.getRepository('user')
			.createQueryBuilder()
			.where({ id: note.author })
			.getOne();

		grabbedNotes[i].author = grabbedAuthor;

		var sortedReactions = [];

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
				if (sortedReactions.find((e) => e.id === reaction.emoji.id)) {
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
		}

		grabbedNotes[i].reactions = sortedReactions;
	});

	res.status(200).json(grabbedNotes);
});

export default router;
