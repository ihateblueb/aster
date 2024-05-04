const router = require('express').Router();

const config = require('../../utils/config.js');
const db = require('../../utils/database.ts');

router.get('/notes/:noteid', async (req, res) => {
	if (!req.params.noteid) {
		return res.status(400).json({ message: 'bad request' });
	} else {
		var grabbedNote = await db.getRepository('notes').find({
			where: {
				id: Number(req.params.noteid)
			}
		});

		var grabbedNote = grabbedNote[0];

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
			noteJson['to'] = ['https://www.w3.org/ns/activitystreams#Public'];
			noteJson['cc'] =
				config.url + 'users/' + grabbedNote.author + '/followers';
			noteJson['inReplyTo'] = grabbedNote.replying_to;

			res.json(noteJson);
		} else {
			return res.status(404).json({ message: 'not found' });
		}
	}
});

module.exports = router;
