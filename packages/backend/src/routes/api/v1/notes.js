import express from 'express';
const router = express.Router();

import db from '../../../utils/database.js';

router.get('/api/v1/notes/:noteid', async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	if (!req.params.noteid) {
		return res.status(400).json({
			message: 'noteid paramater required'
		});
	} else {
		var grabbedNote = await db.getRepository('notes').find({
			where: {
				id: Number(req.params.noteid)
			}
		});

		var grabbedNote = grabbedNote[0];

		if (grabbedNote) {
			var grabbedAuthor = await db.getRepository('users').find({
				where: {
					id: Number(grabbedNote.author)
				}
			});

			var grabbedAuthor = grabbedAuthor[0];

			if (grabbedAuthor) {
				if (grabbedAuthor.suspended) {
					return res.status(400).json({
						message: 'note author suspended'
					});
				} else if (grabbedAuthor.deactivated) {
					return res.status(400).json({
						message: 'note author deactivated'
					});
				} else {
					// good to go :3
					var noteJson = {};

					noteJson['id'] = grabbedNote.id;
					noteJson['local'] = grabbedNote.local;

					noteJson['author'] = {};
					noteJson.author['id'] = grabbedAuthor.id;
					noteJson.author['username'] = grabbedAuthor.username;
					noteJson.author['local'] = grabbedAuthor.local;
					noteJson.author['url'] = grabbedAuthor.url;

					if (grabbedAuthor.displayname) {
						noteJson.author['displayname'] =
							grabbedAuthor.displayname;
					}

					noteJson.author['locked'] = grabbedAuthor.locked;
					noteJson.author['suspended'] = grabbedAuthor.suspended;
					noteJson.author['deactivated'] = grabbedAuthor.deactivated;
					noteJson.author['discoverable'] =
						grabbedAuthor.discoverable;
					noteJson.author['automated'] = grabbedAuthor.automated;

					if (grabbedAuthor.avatar) {
						noteJson.author['avatar'] = grabbedAuthor.avatar;
					}
					if (grabbedAuthor.banner) {
						noteJson.author['banner'] = grabbedAuthor.banner;
					}
					if (grabbedAuthor.background) {
						noteJson.author['background'] =
							grabbedAuthor.background;
					}
					if (grabbedAuthor.bio) {
						noteJson.author['bio'] = grabbedAuthor.bio;
					}

					noteJson.author['is_cat'] = grabbedAuthor.is_cat;
					noteJson.author['speak_as_cat'] =
						grabbedAuthor.speak_as_cat;
					noteJson.author['created_at'] = grabbedAuthor.created_at;

					if (grabbedAuthor.updated_at) {
						noteJson.author['updated_at'] =
							grabbedAuthor.updated_at;
					}

					noteJson['cw'] = grabbedNote.cw;
					noteJson['content'] = grabbedNote.content;
					noteJson['created_at'] = grabbedNote.created_at;

					res.json(noteJson);
				}
			} else {
				return res.status(500).json({
					message: 'author of note invalid'
				});
			}
		} else {
			return res.status(404).json({
				message: 'note doesnt exist'
			});
		}
	}
});

export default router;
