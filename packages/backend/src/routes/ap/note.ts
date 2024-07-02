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
			var grabbedNote = await db
				.getRepository('note')
				.createQueryBuilder()
				.select('note')
				.where({ id: req.params.noteid })
				.getRawOne();

			var grabbedAuthor = await db
				.getRepository('note')
				.createQueryBuilder()
				.select('note')
				.where({ id: req.params.noteid })
				.getRawOne();

			if (grabbedNote && grabbedNote.local) {
				res.setHeader('Content-Type', 'application/activity+json');
				res.json(new ApNote(grabbedNote, grabbedAuthor));
			} else {
				return res.status(404).json({ message: 'Not found' });
			}
		} else {
			next();
		}
	}
});

export default router;
