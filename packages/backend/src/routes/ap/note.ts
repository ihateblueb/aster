import express from 'express';
const router = express.Router();

import config from '../../utils/config.js';
import db from '../../utils/database.js';

router.get('/notes/:noteid', async (req, res, next) => {
	if (!req.params.noteid) {
		return res.status(400).json({ message: 'bad request' });
	} else {
		if (!req.accepts('html')) {
			var grabbedNote = await db.getRepository('notes').findOne({
				where: {
					id: req.params.noteid
				}
			});

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
				noteJson['source'] = {
					content: grabbedNote.content,
					mediaType: 'text/x.misskeymarkdown'
				};

				noteJson['published'] = grabbedNote.created_at;

				// aster:Visibility extension
				noteJson['visibility'] = grabbedNote.visibility;

				if (grabbedNote.visibility === 'public') {
					noteJson['to'] = [
						'https://www.w3.org/ns/activitystreams#Public'
					];
				}

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
