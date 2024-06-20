import express from 'express';

import config from '../../utils/config.js';
import db from '../../utils/database.js';
import ApNote from '../../constructors/ApNote.js';


const router = express.Router();

router.get('/notes/:noteid', async (req, res, next) => {
	if (!req.params.noteid) {
		return res.status(400).json({ message: 'Note ID parameter required' });
	} else {
		if (!req.accepts('html')) {
			var grabbedNote = await db.getRepository('notes').findOne({
				where: {
					id: req.params.noteid
				}
			});

			if (grabbedNote && grabbedNote.local) {
				res.setHeader('Content-Type', 'application/activity+json');
				var noteJson = new ApNote(grabbedNote);
				res.json(noteJson);
			} else {
				return res.status(404).json({ message: 'Not found' });
			}
		} else {
			next();
		}
	}
});

export default router;
