import express from 'express';

import config from '../../utils/config.js';
import db from '../../utils/database.js';
import ApNote from '../../constructors/ApNote.js';
import { Note } from '../../entities/Note.js';

const router = express.Router();

router.get('/notes/:noteid', async (req, res, next) => {
	if (!req.params.noteid) {
		return res.status(400).json({ message: 'Note ID parameter required' });
	} else {
		if (!req.accepts('html')) {
			let grabbedNote = await db
				.getRepository('note')
				.createQueryBuilder()
				.where({ id: req.params.noteid })
				.getOne();

			console.log(grabbedNote);

			if (grabbedNote && grabbedNote.local) {
				let grabbedAuthor = await db
					.getRepository('user')
					.createQueryBuilder()
					.where({ id: grabbedNote.author })
					.getOne();

				if (grabbedAuthor) {
					res.setHeader('Content-Type', 'application/activity+json');

					if (
						grabbedNote.visibility === 'public' ||
						grabbedNote.visibility === 'unlisted'
					) {
						res.json(new ApNote(grabbedNote, grabbedAuthor));
					} else {
						return res.status(401).json({
							message: 'Note not visible to you'
						});
					}
				}
			} else {
				return res.status(404).json({ message: 'Not found' });
			}
		} else {
			next();
		}
	}
});

export default router;
