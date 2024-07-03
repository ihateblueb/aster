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

		console.log(i);

		var sortedReactions = [];

		var grabbedReactions = await db
			.getRepository('note_react')
			.createQueryBuilder('note_react')
			.leftJoinAndSelect('note_react.emoji', 'emoji')
			.where('note_react.note = :note', {
				note: note.id
			})
			.getMany();
	});

	res.status(200).json(grabbedNotes);
});

export default router;
