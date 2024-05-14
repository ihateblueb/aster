import express from 'express';
const router = express.Router();

import config from '../../utils/config.js';
import db from '../../utils/database.js';

router.get('/notes/:noteid', async (req, res, next) => {
	if (!req.params.noteid) {
		return res.status(400).json({ message: 'bad request' });
	} else {
		if (!req.accepts('html')) {
			var grabbedNoteDb = await db.getRepository('notes').find({
				where: {
					id: req.params.noteid
				}
			});

			var grabbedNote = grabbedNoteDb[0];

			if (grabbedNote && grabbedNote.local) {
				res.setHeader('Content-Type', 'application/activity+json');

				var noteJson = {
					'@context': [
						'https://www.w3.org/ns/activitystreams',
						'https://w3id.org/security/v1'
					]
				};

				noteJson['id'] = config.url + 'notes/' + grabbedNote.id;
				noteJson['type'] = 'Note';
				noteJson['attributedTo'] =
					config.url + 'users/' + grabbedNote.author;
				noteJson['content'] = grabbedNote.content;
				noteJson['published'] = grabbedNote.created_at;
				noteJson['to'] = [
					'https://www.w3.org/ns/activitystreams#Public'
				];
				noteJson['cc'] =
					config.url + 'users/' + grabbedNote.author + '/followers';
				noteJson['inReplyTo'] = grabbedNote.replying_to;

				res.json(noteJson);
			} else {
				return res.status(404).json({ message: 'not found' });
			}
		} else {
			next();
		}
	}
});

export default router;
